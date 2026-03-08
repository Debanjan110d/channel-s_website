const FEED_URL =
    'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UChuGtKOtKDiEv-eaqhyyKpg'

const FEED_CACHE_TTL_MS = 5 * 60 * 1000

let cachedFeed = null
let cachedAt = 0
let inFlightFeedRequest = null

async function fetchYoutubeFeed() {
    const response = await fetch(FEED_URL)

    if (!response.ok) {
        throw new Error('Unable to reach feed')
    }

    return response.json()
}

export async function getYoutubeFeed() {
    const now = Date.now()

    if (cachedFeed && now - cachedAt < FEED_CACHE_TTL_MS) {
        return cachedFeed
    }

    if (inFlightFeedRequest) {
        return inFlightFeedRequest
    }

    inFlightFeedRequest = fetchYoutubeFeed()

    try {
        const data = await inFlightFeedRequest
        cachedFeed = data
        cachedAt = Date.now()
        return data
    } finally {
        inFlightFeedRequest = null
    }
}
