import React from 'react'
import { logoutAdmin } from '../../lib/auth'

function StatCard({ label, value, accent = 'text-orange-300' }) {
  return (
    <article className="rounded-xl border border-white/15 bg-[#071326]/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <p className="text-sm text-gray-300">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${accent}`}>{value}</p>
    </article>
  )
}

function formatDate(value) {
  if (!value) return 'N/A'

  try {
    return new Date(value).toLocaleString()
  } catch {
    return 'N/A'
  }
}

function AnalyticsDashboard({ stats, onRefresh, onLogout }) {
  const todayKey = new Date().toISOString().slice(0, 10)
  const todayVisits = stats.dailyVisits[todayKey] || 0

  const topPages = Object.entries(stats.pageViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const topReferrers = Object.entries(stats.referrers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-300">Website Analytics</h1>
          <p className="mt-1 text-sm text-gray-300">Simple local stats for your website traffic and activity.</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-lg border border-orange-400/40 px-4 py-2 text-sm text-orange-200 transition hover:bg-orange-400/10"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              logoutAdmin()
              onLogout()
            }}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Visits" value={stats.totalVisits} />
        <StatCard label="Unique Visitors" value={stats.uniqueVisitors} />
        <StatCard label="Today's Visits" value={todayVisits} />
        <StatCard label="Total Page Views" value={Object.values(stats.pageViews).reduce((sum, count) => sum + count, 0)} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-white/15 bg-[#071326]/80 p-4">
          <h2 className="text-lg font-semibold text-orange-200">Top Pages</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            {topPages.length === 0 && <li>No page data yet.</li>}
            {topPages.map(([page, count]) => (
              <li key={page} className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
                <span>{page}</span>
                <strong className="text-orange-300">{count}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-white/15 bg-[#071326]/80 p-4">
          <h2 className="text-lg font-semibold text-orange-200">Traffic Sources</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            {topReferrers.length === 0 && <li>No source data yet.</li>}
            {topReferrers.map(([source, count]) => (
              <li key={source} className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
                <span>{source}</span>
                <strong className="text-orange-300">{count}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-white/15 bg-[#071326]/80 p-4">
          <h2 className="text-lg font-semibold text-orange-200">Device Split</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            <li className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span>Desktop</span>
              <strong className="text-orange-300">{stats.devices.desktop || 0}</strong>
            </li>
            <li className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span>Mobile</span>
              <strong className="text-orange-300">{stats.devices.mobile || 0}</strong>
            </li>
          </ul>
        </article>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-white/15 bg-[#071326]/80 p-4">
          <h2 className="text-lg font-semibold text-orange-200">Recent Activity</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            {stats.recentPages.length === 0 && <li>No recent activity yet.</li>}
            {stats.recentPages.map(item => (
              <li key={`${item.path}-${item.at}`} className="rounded bg-white/5 px-3 py-2">
                <div className="font-medium text-orange-100">{item.path}</div>
                <div className="text-xs text-gray-400">{formatDate(item.at)}</div>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-white/15 bg-[#071326]/80 p-4">
          <h2 className="text-lg font-semibold text-orange-200">Session Timeline</h2>
          <div className="mt-3 space-y-3 text-sm text-gray-200">
            <div className="rounded bg-white/5 px-3 py-2">
              <p className="text-xs uppercase tracking-wide text-gray-400">First Recorded Visit</p>
              <p className="mt-1 font-medium">{formatDate(stats.firstVisitAt)}</p>
            </div>
            <div className="rounded bg-white/5 px-3 py-2">
              <p className="text-xs uppercase tracking-wide text-gray-400">Last Recorded Visit</p>
              <p className="mt-1 font-medium">{formatDate(stats.lastVisitAt)}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default AnalyticsDashboard
