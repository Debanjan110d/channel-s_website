import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import CircularGallery from '../CircularGallery'
import { getYoutubeFeed } from '../../lib/youtubeFeed'

const isShort = item => {
  if (item?.isShort) return true
  const link = item?.link || ''
  const categories = Array.isArray(item?.categories) ? item.categories.map(c => c.toLowerCase()) : []
  return /shorts\//.test(link) || /\bshorts\b/.test(link) || categories.includes('shorts')
}

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
    const filtered = items.filter(isShort)

    const latestShorts = [...filtered]
      .sort((a, b) => new Date(b?.pubDate || 0) - new Date(a?.pubDate || 0))
      .slice(0, 9)

    const mostViewedShorts = [...filtered]
      .sort((a, b) => (b?.views || 0) - (a?.views || 0))
      .slice(0, 9)

    return { latestShorts, mostViewedShorts, error: null }
  } catch {
    return {
      latestShorts: [],
      mostViewedShorts: [],
      error: 'Unable to load shorts right now. Please try again shortly.',
    }
  }
}

export default function LatestShorts() {
  const { latestShorts, mostViewedShorts, error } = useLoaderData()

  const hasContent = latestShorts.length > 0 || mostViewedShorts.length > 0

  const galleryItems = useMemo(() => {
    const merged = [...latestShorts, ...mostViewedShorts]
    const uniqueById = new Map()

    merged.forEach(item => {
      const videoId = extractVideoId(item?.link)
      if (!videoId || uniqueById.has(videoId)) return

      const shortLink = item?.link || `https://www.youtube.com/shorts/${videoId}`

      uniqueById.set(videoId, {
        image: item?.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        text: item?.title || 'YouTube Short',
        link: shortLink,
      })
    })

    return Array.from(uniqueById.values()).slice(0, 12)
  }, [latestShorts, mostViewedShorts])

  const formatViews = value => {
    if (typeof value !== 'number') return ''
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
  }

  const renderShortCard = (short, cardLabel) => {
    const videoId = extractVideoId(short?.link)
    if (!videoId) return null

    const published = short?.pubDate
      ? new Date(short.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
      : ''
    const views = formatViews(short?.views)
    const shortLink = short?.link || `https://www.youtube.com/shorts/${videoId}`
    const shortTitle = short?.title || 'YouTube Short'

    return (
      <article key={`${cardLabel}-${videoId}`} className="group rounded-3xl border border-white/10 bg-[#0a1633]/80 p-4 backdrop-blur-md shadow-[0_18px_44px_rgba(0,0,0,0.38)] transition hover:-translate-y-1 hover:border-orange-400/70">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-orange-500/60 bg-orange-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-100">{cardLabel}</span>
          {views && <span className="text-xs text-gray-300">{views} views</span>}
        </div>

        <a
          href={shortLink}
          target="_blank"
          rel="noreferrer"
          className="block text-lg font-semibold leading-snug text-white transition-colors hover:text-orange-200 line-clamp-2"
        >
          {shortTitle}
        </a>

        <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
          {published ? <span>Published {published}</span> : <span>Recently uploaded</span>}
          <a
            href={shortLink}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-orange-300 transition-colors hover:text-orange-200"
          >
            Open on YouTube
          </a>
        </div>

        <div className="mt-4 mx-auto max-w-97.5">
          <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black" style={{ aspectRatio: '9 / 16' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="absolute inset-0 h-full w-full"
              title={shortTitle}
              allowFullScreen
            />
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="relative w-full overflow-hidden text-white pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(249,115,22,0.2),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_45%)]" />

      <div className="relative w-full px-4 py-10 sm:px-6 md:py-14 lg:px-10 xl:px-14">
        <header className="mx-auto max-w-6xl space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-orange-300/80">Shorts Hub · Full Page View</p>
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Latest & Most Viewed Shorts</h1>
          <p className="mx-auto max-w-4xl text-gray-300">
            Smooth gallery at the top, full-width layout, and every short includes a direct clickable YouTube link.
          </p>
        </header>

        {error && <p className="mt-8 text-center text-red-300">{error}</p>}

        {!error && !hasContent && (
          <p className="mt-8 text-center text-gray-300">No shorts found in the feed yet. Publish a short and it will appear automatically.</p>
        )}

        {!error && hasContent && (
          <div className="mt-10 space-y-12">
            {galleryItems.length > 0 && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-white md:text-3xl">Shorts Motion Gallery</h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Drag or wheel to explore</p>
                </div>

                <div className="overflow-hidden rounded-3xl bg-transparent">
                  <div style={{ height: 'clamp(460px, 72vh, 760px)', position: 'relative' }}>
                    <CircularGallery
                      items={galleryItems}
                      bend={1}
                      textColor="#ffffff"
                      borderRadius={0.05}
                      scrollSpeed={2}
                      scrollEase={0.05}
                    />
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">Latest Shorts</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Newest uploads</p>
              </div>
              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {latestShorts.map(short => renderShortCard(short, 'Latest'))}
              </div>
            </section>

            <section className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white md:text-3xl">Most Viewed Shorts</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Top performers</p>
              </div>
              <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {mostViewedShorts.map(short => renderShortCard(short, 'Top Viewed'))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
