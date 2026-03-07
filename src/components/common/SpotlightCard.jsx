import React, { useRef } from "react"
import "./SpotlightCard.css"

export default function SpotlightCard({
  title = "Project Spotlight",
  subtitle = "Featured Work",
  description = "A quick highlight of something I'm building right now.",
  href = "#",
  cta = "View more",
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--spot-x", `${x}px`)
    el.style.setProperty("--spot-y", `${y}px`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--spot-x", "50%")
    el.style.setProperty("--spot-y", "50%")
  }

  return (
    <article
      ref={ref}
      className="spot-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="spot-spotlight" aria-hidden="true" />
      <div className="spot-body">
        <p className="spot-tag">Spotlight</p>
        <h3 className="spot-title">{title}</h3>
        <p className="spot-subtitle">{subtitle}</p>
        <p className="spot-description">{description}</p>
        {href && (
          <a className="spot-link" href={href} target="_blank" rel="noreferrer">
            {cta} <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </article>
  )
}
