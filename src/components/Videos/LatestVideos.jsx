import { useEffect, useState } from 'react'

const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UChuGtKOtKDiEv-eaqhyyKpg'

export default function LatestVideos() {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    fetch(FEED_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Unable to reach feed')
        }
        return res.json()
      })
      .then(data => {
        if (!isMounted) return
        const items = Array.isArray(data?.items) ? data.items : []
        setVideos(items)
      })
      .catch(() => {
        if (!isMounted) return
        setError('Unable to load videos right now. Please try again shortly.')
      })

    return () => {
      isMounted = false
    }
  }, [])

  const videosToShow = videos.slice(0, 6)

  return (
    <div className="text-white py-20 px-4">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#08142e]/45 backdrop-blur-md p-6 md:p-10 space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Latest Videos</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Pulled automatically from the channel feed—new uploads appear here without any code updates.
          </p>
        </header>

        {error && (
          <p className="text-center text-red-300">{error}</p>
        )}

        {!error && videosToShow.length === 0 && (
          <p className="text-center text-gray-300">Loading the freshest uploads&hellip;</p>
        )}

        {!error && videosToShow.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {videosToShow.map(video => {
              const videoId = video?.link?.split('v=')[1]
              if (!videoId) return null

              return (
                <article key={videoId} className="rounded-2xl border border-white/10 bg-[#0d1a34]/65 p-3 shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-64 rounded-lg"
                    title={video?.title || 'YouTube video'}
                    allowFullScreen
                  />
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
