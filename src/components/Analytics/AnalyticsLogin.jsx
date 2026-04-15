import React, { useState } from 'react'
import {  loginAdmin } from '../../lib/auth'

function AnalyticsLogin({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    const isValid = loginAdmin(username.trim(), password.trim())

    if (!isValid) {
      setError('Invalid credentials. Use the demo login details shared for this panel.')
      return
    }

    setError('')
    onSuccess()
  }

  return (
    <section className="mx-auto max-w-lg px-4 py-10 sm:py-16">
      <div className="rounded-2xl border border-orange-400/30 bg-[#071326]/85 p-6 sm:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-300">Analytics Login</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-300">
          Enter admin credentials to open your private website analytics dashboard.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-orange-200" htmlFor="analytics-username">
              Username
            </label>
            <input
              id="analytics-username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-[#0b1a33] px-3 py-2.5 text-white outline-none ring-0 transition focus:border-orange-400"
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-orange-200" htmlFor="analytics-password">
              Password
            </label>
            <input
              id="analytics-password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-[#0b1a33] px-3 py-2.5 text-white outline-none ring-0 transition focus:border-orange-400"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            Login To Analytics
          </button>
        </form>
      </div>
    </section>
  )
}

export default AnalyticsLogin
