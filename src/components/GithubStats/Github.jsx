import { useLoaderData } from 'react-router-dom'

const GITHUB_USERNAME = 'Debanjan110d'
const GITHUB_CACHE_TTL_MS = 5 * 60 * 1000

let cachedGithubData = null
let cachedGithubAt = 0
let inFlightGithubRequest = null

async function fetchGithubStats() {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ])

        if (!userRes.ok || !reposRes.ok) {
            throw new Error('Failed to load GitHub data')
        }

        const user = await userRes.json()
        const repos = await reposRes.json()

        const stars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
        const forks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0)

        const languageFrequency = repos.reduce((acc, repo) => {
            if (repo.language) {
                acc[repo.language] = (acc[repo.language] || 0) + 1
            }
            return acc
        }, {})

        const topLanguage = Object.entries(languageFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

        const sortedByUpdated = [...repos].sort(
            (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
        )
        const topRepos = [...repos]
            .filter((repo) => !repo.fork)
            .sort((a, b) => {
                if ((b.stargazers_count || 0) !== (a.stargazers_count || 0)) {
                    return (b.stargazers_count || 0) - (a.stargazers_count || 0)
                }

                if ((b.forks_count || 0) !== (a.forks_count || 0)) {
                    return (b.forks_count || 0) - (a.forks_count || 0)
                }

                return new Date(b.pushed_at) - new Date(a.pushed_at)
            })
            .slice(0, 6)
        const latestRepo = sortedByUpdated[0] || null

        const topLanguages = Object.entries(languageFrequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([language, count]) => ({ language, count }))

        return {
            profile: user,
            repoStats: { stars, forks, topLanguage },
            languages: topLanguages,
            highlights: { latestRepo, topRepos },
            status: 'ready',
        }
    } catch {
        return {
            profile: null,
            repoStats: { stars: 0, forks: 0, topLanguage: 'N/A' },
            languages: [],
            highlights: { latestRepo: null, topRepos: [] },
            status: 'error',
        }
    }
}

export async function githubStatsLoader() {
    const now = Date.now()

    if (cachedGithubData && now - cachedGithubAt < GITHUB_CACHE_TTL_MS) {
        return cachedGithubData
    }

    if (inFlightGithubRequest) {
        return inFlightGithubRequest
    }

    inFlightGithubRequest = fetchGithubStats()

    try {
        const data = await inFlightGithubRequest
        cachedGithubData = data
        cachedGithubAt = Date.now()
        return data
    } finally {
        inFlightGithubRequest = null
    }
}

export default function GithubStats() {
    const { profile, repoStats, languages, highlights, status } = useLoaderData()
    const hasError = status === 'error'

    return (
        <div className="py-20 text-white min-h-screen">
            <div className="max-w-6xl mx-auto px-6 rounded-3xl border border-white/10 bg-[#08142e]/45 backdrop-blur-md p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
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
                    <div className="bg-[#0d1a34]/65 border border-white/10 rounded-2xl p-6 shadow-lg">
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
                                <p className="text-xl font-semibold">{profile ? profile.login : '--'}</p>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-300 leading-6">
                            {profile?.bio || 'Coding, shipping, iterating.'}
                        </p>

                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <StatCard label="Followers" value={profile?.followers} />
                            <StatCard label="Following" value={profile?.following} />
                            <StatCard label="Repos" value={profile?.public_repos} />
                            <StatCard label="Gists" value={profile?.public_gists} />
                        </div>
                    </div>

                    <div className="bg-[#0d1a34]/65 border border-white/10 rounded-2xl p-6 shadow-lg space-y-5">
                        <h3 className="text-lg font-semibold">Repository Overview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard label="Stars" value={repoStats.stars} accent="text-yellow-300" />
                            <StatCard label="Forks" value={repoStats.forks} accent="text-blue-300" />
                            <StatCard label="Top Lang" value={repoStats.topLanguage} />
                        </div>

                        <div className="bg-[#071326]/75 border border-white/10 rounded-xl p-4">
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
                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#071326]/75 px-3 py-1 text-sm text-gray-200"
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
                    <h3 className="text-lg font-semibold mb-4">Top Repositories</h3>
                    {highlights.topRepos.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {highlights.topRepos.map((repo) => (
                                <TopRepoCard key={repo.id} repo={repo} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-[#0d1a34]/65 p-6 shadow-lg">
                            <p className="text-gray-500 text-sm">No repository data available right now.</p>
                        </div>
                    )}
                </section>

                <section className="mt-10 grid gap-6">
                    <HighlightCard
                        title="Latest Push"
                        repo={highlights.latestRepo}
                        fallback="No recent activity"
                    />
                </section>

                {hasError && (
                    <div className="mt-6 rounded-xl border border-rose-700 bg-rose-900/50 p-4 text-rose-100 text-sm">
                        Unable to load GitHub data right now. Please refresh or try again later.
                    </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ label, value, accent }) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#071326]/75 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className={`text-2xl font-bold mt-2 ${accent || "text-white"}`}>
                {value ?? "--"}
            </p>
        </div>
    )
}

function HighlightCard({ title, repo, fallback }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#0d1a34]/65 p-6 shadow-lg">
            <p className="text-sm text-gray-400">{title}</p>
            {repo ? (
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
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
                            ⭐ {repo.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
                            🍴 {repo.forks_count}
                        </span>
                        {repo.language && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
                                {repo.language}
                            </span>
                        )}
                        {repo.pushed_at && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
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

function TopRepoCard({ repo }) {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-white/10 bg-[#0d1a34]/65 p-5 shadow-lg transition-colors hover:border-orange-400/60"
        >
            <p className="text-lg font-semibold text-orange-300 line-clamp-1">{repo.name}</p>
            <p className="mt-2 text-sm text-gray-300 leading-6 min-h-12">
                {repo.description || 'No description provided.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-300">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
                    ⭐ {repo.stargazers_count || 0}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
                    🍴 {repo.forks_count || 0}
                </span>
                {repo.language && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#071326]/75 px-3 py-1 border border-white/10">
                        {repo.language}
                    </span>
                )}
            </div>
            <p className="mt-3 text-xs text-gray-500">
                Updated {repo.pushed_at ? new Date(repo.pushed_at).toLocaleDateString() : 'N/A'}
            </p>
        </a>
    )
}
