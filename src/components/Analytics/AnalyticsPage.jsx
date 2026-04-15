import React, { useCallback, useEffect, useState } from 'react'
import AnalyticsLogin from './AnalyticsLogin'
import AnalyticsDashboard from './AnalyticsDashboard'
import { getAnalyticsStats } from '../../lib/analytics'
import { isAdminLoggedIn } from '../../lib/auth'

function AnalyticsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [stats, setStats] = useState(() => getAnalyticsStats())

  useEffect(() => {
    setIsLoggedIn(isAdminLoggedIn())
  }, [])

  const refreshStats = useCallback(() => {
    setStats(getAnalyticsStats())
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    refreshStats()
  }

  if (!isLoggedIn) {
    return <AnalyticsLogin onSuccess={handleLoginSuccess} />
  }

  return (
    <AnalyticsDashboard
      stats={stats}
      onRefresh={refreshStats}
      onLogout={() => setIsLoggedIn(false)}
    />
  )
}

export default AnalyticsPage
