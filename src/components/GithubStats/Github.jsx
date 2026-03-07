import { useEffect, useState } from "react"

export default function GithubStats() {
    const [profile, setProfile] = useState(null)
    const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0, topLanguage: "N/A" })
    const [languages, setLanguages] = useState([])
    const [highlights, setHighlights] = useState({ latestRepo: null })
    const [activity, setActivity] = useState([])
    const [status, setStatus] = useState("idle")

    useEffect(() => {
        const username = "Debanjan110d"
        const controller = new AbortController()

        async function loadStats() {
            setStatus("loading")

            try {
                const [userRes, reposRes, eventsRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
                    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
                        signal: controller.signal,
                    }),
                    fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
                        signal: controller.signal,
                    }),
                ])

                if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
                    throw new Error("Failed to load GitHub data")
                }

                const user = await userRes.json()
                const repos = await reposRes.json()
                const events = await eventsRes.json()

                const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
                const forks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)

                const languageFrequency = repos.reduce((acc, repo) => {
                    if (repo.language) {
                        acc[repo.language] = (acc[repo.language] || 0) + 1
                    }
                    return acc
                }, {})

                const topLanguage = Object.entries(languageFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

                const sortedByUpdated = [...repos].sort(
                    (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
                )
                const latestRepo = sortedByUpdated[0] || null

                const topLanguages = Object.entries(languageFrequency)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 6)
                    .map(([language, count]) => ({ language, count }))

                const commitsByDay = events.reduce((acc, event) => {
                    if (event.type === "PushEvent") {
                        const day = event.created_at.slice(0, 10)
                        acc[day] = (acc[day] || 0) + (event.payload?.size || 0)
                    }
                    return acc
                }, {})

                const today = new Date()
                const last14Days = Array.from({ length: 14 }).map((_, idx) => {
                    const d = new Date(today)
                    d.setDate(today.getDate() - (13 - idx))
                    const key = d.toISOString().slice(0, 10)
                    return { label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), count: commitsByDay[key] || 0 }
                })

                setProfile(user)
                setRepoStats({ stars, forks, topLanguage })
                setLanguages(topLanguages)
                setHighlights({ latestRepo })
                setActivity(last14Days)
                setStatus("ready")
            } catch (error) {
                if (error.name === "AbortError") return
                setStatus("error")
            }
        }

        loadStats()
        return () => controller.abort()
    }, [])

    const isLoading = status === "loading"
    const hasError = status === "error"

    return (
        <div className="bg-gray-900 py-20 text-white min-h-screen">
            <div className="max-w-6xl mx-auto px-6">
                <header className="text-center">
                    <p className="text-orange-400 uppercase text-xs font-semibold tracking-[0.2em]">Live GitHub Snapshot</p>
                    <h2 className="text-4xl font-bold mt-3">GitHub Activity</h2>
                    <p className="mt-3 text-gray-400">Pulled directly from the GitHub API with live stats.</p>
                    <div className="mt-6">
                        <a
                            href="https://github.com/Debanjan110d"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-500 px-5 py-2 text-sm font-semibold transition-colors"
                        >
                            Visit GitHub Profile
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </header>

                <section className="mt-12 grid gap-6 md:grid-cols-2">
                    <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-2xl">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Avatar" className="h-14 w-14 rounded-full object-cover" />
                                ) : (
                                    "🐙"
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">User</p>
                                <p className="text-xl font-semibold">{profile ? profile.login : "Loading..."}</p>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-300 leading-6">
                            {profile?.bio || "Coding, shipping, iterating."}
                        </p>

                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <StatCard label="Followers" value={profile?.followers} loading={isLoading} />
                            <StatCard label="Following" value={profile?.following} loading={isLoading} />
                            <StatCard label="Repos" value={profile?.public_repos} loading={isLoading} />
                            <StatCard label="Gists" value={profile?.public_gists} loading={isLoading} />
                        </div>
                    </div>

                    <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 shadow-lg space-y-5">
                        <h3 className="text-lg font-semibold">Repository Overview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard label="Stars" value={repoStats.stars} loading={isLoading} accent="text-yellow-300" />
                            <StatCard label="Forks" value={repoStats.forks} loading={isLoading} accent="text-blue-300" />
                            <StatCard label="Top Lang" value={repoStats.topLanguage} loading={isLoading} />
                        </div>

                        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-4">
                            <p className="text-sm text-gray-400">Profile created</p>
                            <p className="text-xl font-semibold mt-1">
                                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "--"}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">Most recent data comes straight from the GitHub REST API.</p>
                        </div>

                        {languages.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-400 mb-2">Top languages across repositories</p>
                                <div className="flex flex-wrap gap-2">
                                    {languages.map(({ language, count }) => (
                                        <span
                                            key={language}
                                            className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/60 px-3 py-1 text-sm text-gray-200"
                                        >
                                            {language}
                                            <span className="text-xs text-gray-400">{count} repos</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="mt-10">
                    <h3 className="text-lg font-semibold mb-4">Commit Continuity (last 14 days)</h3>
                    <ActivityChart data={activity} loading={isLoading} />
                </section>

                <section className="mt-10 grid gap-6">
                    <HighlightCard
                        title="Latest Push"
                        repo={highlights.latestRepo}
                        loading={isLoading}
                        fallback="No recent activity"
                    />
                </section>

                {hasError && (
                    <div className="mt-6 rounded-xl border border-rose-700 bg-rose-900/50 p-4 text-rose-100 text-sm">
                        Unable to load GitHub data right now. Please refresh or try again later.
                    </div>
                )}

                {isLoading && !hasError && (
                    <div className="mt-6 text-center text-gray-400 text-sm">Fetching fresh data...</div>
                )}
            </div>
        </div>
    )
}

function StatCard({ label, value, loading, accent }) {
    return (
        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className={`text-2xl font-bold mt-2 ${accent || "text-white"}`}>
                {loading ? "--" : value ?? "--"}
            </p>
        </div>
    )
}

function HighlightCard({ title, repo, loading, fallback }) {
    return (
        <div className="rounded-2xl border border-gray-700 bg-gray-800/70 p-6 shadow-lg">
            <p className="text-sm text-gray-400">{title}</p>
            {loading ? (
                <p className="mt-3 text-gray-500">Loading...</p>
            ) : repo ? (
                <div className="mt-3 space-y-2">
                    <a
                        className="text-xl font-semibold text-orange-300 hover:text-orange-200"
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {repo.name}
                    </a>
                    {repo.description && <p className="text-gray-300 text-sm leading-6">{repo.description}</p>}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-300 mt-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-900/70 px-3 py-1 border border-gray-700">
                            ⭐ {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-900/70 px-3 py-1 border border-gray-700">
                            🍴 {repo.forks_count}
                        </span>
                        {repo.language && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-900/70 px-3 py-1 border border-gray-700">
                                {repo.language}
                            </span>
                        )}
                        {repo.pushed_at && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-900/70 px-3 py-1 border border-gray-700">
                                Updated {new Date(repo.pushed_at).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <p className="mt-3 text-gray-500">{fallback}</p>
            )}
        </div>
    )
}

function ActivityChart({ data, loading }) {
    const max = data.reduce((m, point) => Math.max(m, point.count), 0)

    return (
        <div className="rounded-2xl border border-gray-700 bg-gray-800/70 p-6 shadow-lg">
            {loading ? (
                <p className="text-gray-500 text-sm">Loading...</p>
            ) : data.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent commit activity.</p>
            ) : (
                <>
                    <div className="flex items-end gap-2 h-40">
                        {data.map((point) => {
                            const height = max ? Math.max(6, Math.round((point.count / max) * 100)) : 6
                            return (
                                <div key={point.label} className="flex flex-col items-center gap-2 min-w-[18px]">
                                    <div
                                        className="w-6 rounded-md bg-orange-500/80 border border-orange-400/60"
                                        style={{ height: `${height}%`, minHeight: "8px" }}
                                        title={`${point.label}: ${point.count} commits`}
                                    ></div>
                                    <p className="text-[11px] text-gray-400 leading-none">{point.label}</p>
                                </div>
                            )
                        })}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">Data from public push events (GitHub API).</p>
                </>
            )}
        </div>
    )
}