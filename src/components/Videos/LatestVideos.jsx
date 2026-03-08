import { useLoaderData } from 'react-router-dom'
import { getYoutubeFeed } from '../../lib/youtubeFeed'
import CardSwap, { Card } from '../CardSwap'

const isShort = item => {
  const link = item?.link || ''
  const categories = Array.isArray(item?.categories) ? item.categories.map(c => c.toLowerCase()) : []
  return /shorts\//.test(link) || /\bshorts\b/.test(link) || categories.includes('shorts')
}

const extractVideoId = link => {
  if (!link) return null
  const watchMatch = link.match(/[?&]v=([^?&]+)/)
  if (watchMatch?.[1]) return watchMatch[1]
  const shortsMatch = link.match(/shorts\/([^?&]+)/)
  if (shortsMatch?.[1]) return shortsMatch[1]
  return null
}

const decodeHtml = text => {
  if (!text) return ''
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

export async function latestVideosLoader() {
  try {
    const data = await getYoutubeFeed()
    const items = Array.isArray(data?.items) ? data.items : []
    const longFormVideos = items.filter(item => !isShort(item))
    return { videos: longFormVideos, error: null }
  } catch {
    return {
      videos: [],
      error: 'Unable to load videos right now. Please try again shortly.',
    }
  }
}

export default function LatestVideos() {
  const { videos, error } = useLoaderData()

  const videosToShow = videos.slice(0, 6)

  return (
    <section className="relative overflow-hidden py-12 text-white md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-72 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.2),rgba(8,20,46,0))]" />

      <header className="relative mx-auto hidden max-w-5xl px-4 text-center md:block">
        <h1 className="text-4xl font-bold md:text-5xl">Latest Videos</h1>
        <p className="mx-auto mt-3 max-w-3xl text-gray-300">
          Long-form uploads in an immersive rotating stack, pulled automatically from your channel feed.
        </p>
      </header>

      {error && (
        <p className="relative mx-auto mt-8 hidden max-w-4xl px-4 text-center text-red-300 md:block">{error}</p>
      )}

      {!error && videosToShow.length === 0 && (
        <p className="relative mx-auto mt-8 hidden max-w-4xl px-4 text-center text-gray-300 md:block">No long-form videos found in the feed right now.</p>
      )}

      {!error && videosToShow.length > 0 && (
        <div className="relative mx-auto mt-8 max-w-7xl px-4 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8">
          <aside className="mb-8 hidden rounded-2xl border border-white/10 bg-[#0b1732]/60 p-5 backdrop-blur-md lg:mb-0 lg:mt-8 lg:block lg:h-fit lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.18em] text-orange-300/90">Now Playing Queue</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {videosToShow.map((video, index) => {
                const published = video?.pubDate
                  ? new Date(video.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                  : ''
                const videoLink = video?.link || '#'
                const videoTitle = decodeHtml(video?.title || 'YouTube video')

                return (
                  <li key={`${video?.link || video?.title || index}-title`}>
                    <a
                      href={videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-white/10 bg-[#08142e]/70 px-3 py-2 transition-colors hover:border-orange-400/60 hover:bg-[#0c1d3f]/80"
                    >
                      <p className="text-xs font-semibold tracking-wide text-orange-200">#{index + 1}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-white">{videoTitle}</p>
                      {published && <p className="mt-1 text-[11px] text-gray-400">Published {published}</p>}
                      <p className="mt-2 text-[11px] font-medium text-orange-300">Watch on YouTube ↗</p>
                    </a>
                  </li>
                )
              })}
            </ul>
          </aside>

          <div className="relative h-[500px] overflow-hidden sm:h-[580px] md:h-[660px] lg:h-[860px]">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-[linear-gradient(to_top,rgba(8,20,46,0.7),rgba(8,20,46,0))]" />
            <CardSwap
              width={720}
              height={470}
              cardDistance={74}
              verticalDistance={86}
              delay={5000}
              pauseOnHover={false}
              containerClassName="left-1/2 top-[10%] origin-top transform -translate-x-1/2 translate-y-0 max-[1280px]:top-[12%] max-[1024px]:top-[14%] max-[1024px]:scale-[0.82] max-[768px]:top-[16%] max-[768px]:scale-[0.66] max-[520px]:top-[18%] max-[520px]:scale-[0.58]"
            >
              {videosToShow.map(video => {
                const videoId = extractVideoId(video?.link)
                if (!videoId) return null

                const published = video?.pubDate
                  ? new Date(video.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                  : ''
                const videoTitle = decodeHtml(video?.title || 'YouTube video')

                return (
                  <Card key={videoId} customClass="overflow-hidden border-white/20 bg-[#060c1b] shadow-[0_20px_48px_rgba(0,0,0,0.45)]">
                    <article className="h-full w-full p-4">
                      <div className="h-full rounded-xl border border-white/10 bg-[#030814] p-4">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          className="h-[300px] w-full rounded-lg md:h-[320px]"
                          title={videoTitle}
                          allowFullScreen
                        />
                        <h3 className="mt-3 text-sm font-semibold text-white line-clamp-2 md:text-base">{videoTitle}</h3>
                        {published && <p className="mt-1 text-xs text-gray-400">Published {published}</p>}
                      </div>
                    </article>
                  </Card>
                )
              })}
            </CardSwap>
          </div>
        </div>
      )}

      {!error && videosToShow.length > 0 && (
        <p className="relative -mt-5 hidden px-4 text-center text-xs text-gray-400 md:block">Tip: hover to track each card as it rotates.</p>
      )}
    </section>
  )
}
