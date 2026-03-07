import React, { useRef, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./SpotlightCard.css"

export default function SpotlightCard({
  title = "Project Spotlight",
  subtitle = "Featured Work",
  description = "A quick highlight of something I'm building right now.",
  href = "#",
  cta = "View more",
}) {
  const ref = useRef(null)
  const navigate = useNavigate()
  const isInternal = href && href.startsWith("/") && !href.startsWith("//")

  const handleNavigate = useCallback(() => {
    if (!href) return
    if (isInternal) {
      navigate(href)
    } else {
      window.open(href, "_blank", "noreferrer")
    }
  }, [href, isInternal, navigate])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleNavigate()
      }
    },
    [handleNavigate]
  )

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
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role={href ? "link" : undefined}
      tabIndex={href ? 0 : -1}
    >
      <div className="spot-spotlight" aria-hidden="true" />
      <div className="spot-body">
        <p className="spot-tag">Spotlight</p>
        <h3 className="spot-title">{title}</h3>
        <p className="spot-subtitle">{subtitle}</p>
        <p className="spot-description">{description}</p>
        {href && (
          isInternal ? (
            <Link className="spot-link" to={href} onClick={(e) => e.stopPropagation()}>
              {cta} <span aria-hidden>↗</span>
            </Link>
          ) : (
            <a
              className="spot-link"
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {cta} <span aria-hidden>↗</span>
            </a>
          )
        )}
      </div>
    </article>
  )
}
