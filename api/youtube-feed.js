import process from 'node:process'

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3'
const DEFAULT_CHANNEL_ID = 'UChuGtKOtKDiEv-eaqhyyKpg'
const SHORT_MAX_DURATION_SECONDS = 180
const MAX_UPLOADS = 50

function parseDurationToSeconds(duration) {
    if (!duration) return null

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return null

    const hours = Number(match[1] || 0)
    const minutes = Number(match[2] || 0)
    const seconds = Number(match[3] || 0)
    return hours * 3600 + minutes * 60 + seconds
}

function resolveThumbnail(thumbnails) {
    return (
        thumbnails?.maxres?.url ||
        thumbnails?.standard?.url ||
        thumbnails?.high?.url ||
        thumbnails?.medium?.url ||
        thumbnails?.default?.url ||
        ''
    )
}

function chunk(array, chunkSize) {
    const output = []
    for (let i = 0; i < array.length; i += chunkSize) {
        output.push(array.slice(i, i + chunkSize))
    }
    return output
}

async function fetchJson(pathName, params, requestLabel) {
    const url = new URL(`${YOUTUBE_API_BASE_URL}/${pathName}`)
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url)

    if (!response.ok) {
        const body = await response.text()
        throw new Error(`YouTube API request failed (${requestLabel}): ${response.status} ${body}`)
    }

    return response.json()
}

async function getUploadsPlaylistId(apiKey, channelId) {
    const data = await fetchJson(
        'channels',
        {
            part: 'contentDetails',
            id: channelId,
            key: apiKey,
        },
        'channels'
    )

    const uploadsId = data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
    if (!uploadsId) {
        throw new Error('Unable to determine uploads playlist for channel')
    }

    return uploadsId
}

async function getLatestUploads(apiKey, uploadsPlaylistId) {
    const data = await fetchJson(
        'playlistItems',
        {
            part: 'snippet',
            playlistId: uploadsPlaylistId,
            maxResults: String(MAX_UPLOADS),
            key: apiKey,
        },
        'playlistItems'
    )

    return Array.isArray(data?.items) ? data.items : []
}

async function getVideoMetaByVideoId(apiKey, videoIds) {
    const metaMap = new Map()
    if (!videoIds.length) return metaMap

    const idChunks = chunk(videoIds, 50)

    for (const ids of idChunks) {
        const data = await fetchJson(
            'videos',
            {
                part: 'contentDetails,statistics',
                id: ids.join(','),
                key: apiKey,
                maxResults: String(ids.length),
            },
            'videos'
        )

        const items = Array.isArray(data?.items) ? data.items : []

        for (const item of items) {
            const videoId = item?.id
            if (!videoId) continue

            const durationSeconds = parseDurationToSeconds(item?.contentDetails?.duration)
            const viewCount = Number(item?.statistics?.viewCount || 0)

            metaMap.set(videoId, {
                durationSeconds,
                viewCount: Number.isFinite(viewCount) ? viewCount : 0,
            })
        }
    }

    return metaMap
}

function normalizeItem(upload, metaMap) {
    const snippet = upload?.snippet
    const videoId = snippet?.resourceId?.videoId
    if (!videoId) return null

    const videoMeta = metaMap.get(videoId) || {}
    const durationSeconds = videoMeta.durationSeconds
    const isShort = typeof durationSeconds === 'number' && durationSeconds <= SHORT_MAX_DURATION_SECONDS
    const viewCount = videoMeta.viewCount || 0

    return {
        videoId,
        title: snippet?.title || 'YouTube video',
        pubDate: snippet?.publishedAt || null,
        link: isShort
            ? `https://www.youtube.com/shorts/${videoId}`
            : `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: resolveThumbnail(snippet?.thumbnails),
        description: snippet?.description || '',
        views: viewCount,
        durationSeconds: durationSeconds ?? null,
        isShort,
        categories: isShort ? ['Shorts'] : ['Videos'],
    }
}

async function buildFeed() {
    const apiKey = (process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || '').trim()
    const channelId = (process.env.YOUTUBE_CHANNEL_ID || process.env.VITE_YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID).trim()

    if (!apiKey) {
        throw new Error('Missing YOUTUBE_API_KEY')
    }

    const uploadsPlaylistId = await getUploadsPlaylistId(apiKey, channelId)
    const uploads = await getLatestUploads(apiKey, uploadsPlaylistId)
    const videoIds = uploads.map(item => item?.snippet?.resourceId?.videoId).filter(Boolean)

    const metaMap = await getVideoMetaByVideoId(apiKey, videoIds)
    const items = uploads.map(item => normalizeItem(item, metaMap)).filter(Boolean)

    return {
        generatedAt: new Date().toISOString(),
        channelId,
        items,
    }
}

function sendJson(res, status, payload) {
    res.status(status)
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.json(payload)
}

export default async function handler(_req, res) {
    try {
        const payload = await buildFeed()
        sendJson(res, 200, payload)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        sendJson(res, 503, {
            generatedAt: new Date().toISOString(),
            items: [],
            error: message,
        })
    }
}
