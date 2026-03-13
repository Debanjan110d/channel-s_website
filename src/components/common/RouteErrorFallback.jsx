import { Link, useRouteError } from 'react-router-dom'

export default function RouteErrorFallback() {
  const error = useRouteError()
  const message = error?.statusText || error?.message || 'Something went wrong while loading this page.'

  return (
    <section className="min-h-screen bg-[#050b1a] px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#0b1732]/70 p-8 text-center backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300/90">Route Error</p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">This page failed to load</h1>
        <p className="mt-4 text-gray-300">{message}</p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-lg border border-orange-400/70 bg-orange-500/20 px-5 py-2 text-sm font-semibold text-orange-100 transition-colors hover:bg-orange-500/30"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  )
}