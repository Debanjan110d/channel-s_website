import { useLoaderData } from 'react-router-dom'
import { getYoutubeFeed } from '../../lib/youtubeFeed'

const extractVideoId = link => {
  if (!link) return null
  const shortsMatch = link.match(/shorts\/([^?&]+)/)
  if (shortsMatch?.[1]) return shortsMatch[1]
  const watchMatch = link.match(/[?&]v=([^?&]+)/)
  if (watchMatch?.[1]) return watchMatch[1]
  return null
}

export async function latestShortsLoader() {
  try {
    const data = await getYoutubeFeed()
    const items = Array.isArray(data?.items) ? data.items : []
    const filtered = items.filter(item => {
      const link = item?.link || ''
      const categories = Array.isArray(item?.categories) ? item.categories.map(c => c.toLowerCase()) : []
      return /shorts\//.test(link) || /\bshorts\b/.test(link) || categories.includes('shorts')
    })

    return { shorts: filtered, error: null }
  } catch {
    return {
      shorts: [],
      error: 'Unable to load shorts right now. Please try again shortly.',
    }
  }
}

export default function LatestShorts() {
  const { shorts, error } = useLoaderData()

  const shortsToShow = shorts.slice(0, 6)

  return (
    <div className="text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-14 space-y-10 rounded-3xl border border-white/10 bg-[#08142e]/45 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-orange-300/80">Channel feed · Auto-updating</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Latest Shorts</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Fresh, under-60s clips straight from your YouTube RSS feed. New shorts land here automatically after you publish.
          </p>
          <div className="flex justify-center gap-3 text-xs">
            <span className="rounded-full border border-orange-500/60 px-3 py-1 text-orange-100">Auto refresh via RSS</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-200">Embeds play inline</span>
          </div>
        </header>

        {error && <p className="text-center text-red-300">{error}</p>}

        {!error && shortsToShow.length === 0 && (
          <p className="text-center text-gray-300">No shorts found in the feed yet. Publish a short and it will appear automatically.</p>
        )}

        {!error && shortsToShow.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {shortsToShow.map(short => {
              const videoId = extractVideoId(short?.link)
              if (!videoId) return null

              const published = short?.pubDate
                ? new Date(short.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : ''

              return (
                <article
                  key={videoId}
                  className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-[0_18px_40px_rgba(249,115,22,0.12)] transition duration-200 hover:-translate-y-1 hover:border-orange-400/70 hover:shadow-[0_18px_40px_rgba(249,115,22,0.2)]"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-orange-500/10 via-transparent to-white/0 opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-orange-300/90">
                      <span className="rounded-full bg-orange-500/15 px-3 py-1 font-semibold text-orange-100">Short</span>
                      <span className="text-gray-300/80">Under 60s</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2">{short?.title || 'YouTube Short'}</h3>
                    {published && <p className="text-xs text-gray-400">Published {published}</p>}
                  </div>

                  <div className="relative aspect-9/16 w-full bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="absolute inset-0 h-full w-full rounded-2xl"
                      title={short?.title || 'YouTube short'}
                      allowFullScreen
                    />
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
