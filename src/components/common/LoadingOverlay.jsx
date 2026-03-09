import Loader from './Loader'

function LoadingOverlay({ label = 'Loading content...', scope = 'screen' }) {
  const isContentScope = scope === 'content'

  return (
    <div
      className={`${isContentScope ? 'absolute inset-0 z-[90]' : 'fixed inset-0 z-[120]'} flex items-center justify-center bg-[#050814]/45 backdrop-blur-[2px]`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="flex flex-col items-center px-2 py-2">
        <Loader />
        <p className="-mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-orange-100 md:text-base [text-shadow:0_6px_18px_rgba(0,0,0,0.92)]">{label}</p>
      </div>
    </div>
  )
}

export default LoadingOverlay