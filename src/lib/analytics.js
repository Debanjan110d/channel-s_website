const ANALYTICS_STORAGE_KEY = 'channelS_analytics_v1'
const VISITOR_ID_KEY = 'channelS_visitor_id'
const SESSION_RECORDED_KEY = 'channelS_session_recorded'

function createDefaultStats() {
    return {
        firstVisitAt: null,
        lastVisitAt: null,
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: {},
        devices: {
            mobile: 0,
            desktop: 0,
        },
        referrers: {},
        dailyVisits: {},
        recentPages: [],
    }
}

function readStats() {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY)

    if (!raw) {
        return createDefaultStats()
    }

    try {
        const parsed = JSON.parse(raw)
        return {
            ...createDefaultStats(),
            ...parsed,
            pageViews: parsed.pageViews || {},
            devices: parsed.devices || { mobile: 0, desktop: 0 },
            referrers: parsed.referrers || {},
            dailyVisits: parsed.dailyVisits || {},
            recentPages: Array.isArray(parsed.recentPages) ? parsed.recentPages : [],
        }
    } catch {
        return createDefaultStats()
    }
}

function writeStats(stats) {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(stats))
}

function getVisitorId() {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY)

    if (!visitorId) {
        if (window.crypto?.randomUUID) {
            visitorId = window.crypto.randomUUID()
        } else {
            visitorId = `${Date.now()}-${Math.random().toString(16).slice(2)}`
        }

        localStorage.setItem(VISITOR_ID_KEY, visitorId)
    }

    return visitorId
}

function getReferrerLabel() {
    if (!document.referrer) return 'direct'

    try {
        const url = new URL(document.referrer)
        return url.hostname || 'direct'
    } catch {
        return 'direct'
    }
}

function getDeviceType() {
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod/i
    return mobileRegex.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

function addRecentPage(stats, page) {
    const updated = [page, ...stats.recentPages.filter(item => item.path !== page.path)]
    stats.recentPages = updated.slice(0, 8)
}

export function recordVisit(pathname) {
    const stats = readStats()
    const nowIso = new Date().toISOString()
    const dayKey = nowIso.slice(0, 10)

    const visitorId = getVisitorId()
    const uniqueFlagKey = `channelS_seen_${visitorId}`

    if (!localStorage.getItem(uniqueFlagKey)) {
        stats.uniqueVisitors += 1
        localStorage.setItem(uniqueFlagKey, 'true')
    }

    if (!sessionStorage.getItem(SESSION_RECORDED_KEY)) {
        stats.totalVisits += 1
        stats.dailyVisits[dayKey] = (stats.dailyVisits[dayKey] || 0) + 1

        const referrer = getReferrerLabel()
        stats.referrers[referrer] = (stats.referrers[referrer] || 0) + 1

        const device = getDeviceType()
        stats.devices[device] = (stats.devices[device] || 0) + 1

        sessionStorage.setItem(SESSION_RECORDED_KEY, 'true')
    }

    stats.pageViews[pathname] = (stats.pageViews[pathname] || 0) + 1

    addRecentPage(stats, {
        path: pathname,
        at: nowIso,
    })

    if (!stats.firstVisitAt) {
        stats.firstVisitAt = nowIso
    }

    stats.lastVisitAt = nowIso
    writeStats(stats)

    return stats
}

export function getAnalyticsStats() {
    return readStats()
}
