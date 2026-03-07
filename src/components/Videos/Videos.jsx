import React from 'react'

const latestUploads = [
  {
    id: 'latest-1',
    title: 'AI Agent Starter Kit (React + Vite)',
    href: 'https://www.youtube.com/watch?v=dk4Y8Oc8qB8',
    duration: '12:48',
    description: 'How to scaffold a React/Vite project for streaming-ready demos.',
  },
  {
    id: 'latest-2',
    title: 'EmailJS Contact Form Deep Dive',
    href: 'https://www.youtube.com/watch?v=6TTsuQ8t1_k',
    duration: '09:57',
    description: 'Secure env setup, validation, and toasts for production forms.',
  },
  {
    id: 'latest-3',
    title: 'GitHub Stats Dashboard Walkthrough',
    href: 'https://www.youtube.com/watch?v=hQhd7Ae9wMk',
    duration: '14:22',
    description: 'Live profile metrics and charts powered by the GitHub REST API.',
  },
]

const shorts = [
  {
    id: 'short-1',
    title: 'Tailwind Tip: Gradient Borders',
    href: 'https://www.youtube.com/shorts/2u3yUk5TajA',
    duration: '0:43',
  },
  {
    id: 'short-2',
    title: 'VS Code Shortcut Stack',
    href: 'https://www.youtube.com/shorts/HDYmrqiT3vk',
    duration: '0:38',
  },
  {
    id: 'short-3',
    title: 'Git Alias in 30s',
    href: 'https://www.youtube.com/shorts/PNI5lTyBC0o',
    duration: '0:32',
  },
]

const longForm = [
  {
    id: 'long-1',
    title: 'Full-Stack Streaming Setup (OBS + Audio)',
    href: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    duration: '42:10',
    description: 'Scenes, filters, and overlays configured for crisp code streams.',
  },
  {
    id: 'long-2',
    title: 'React Animations Without Pain',
    href: 'https://www.youtube.com/watch?v=0fYi8SGA20k',
    duration: '36:54',
    description: 'Framer Motion patterns, performance notes, and reuse strategies.',
  },
  {
    id: 'long-3',
    title: 'API Hardening for Side Projects',
    href: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
    duration: '48:31',
    description: 'Rate limits, keys, retries, and observability for indie apps.',
  },
]

const liveStreams = [
  {
    id: 'live-1',
    title: 'Live Coding: Shipping a GitHub Stats Widget',
    href: 'https://www.youtube.com/@GamersCodeLab/live',
    schedule: 'Usually Sat 8:00 PM IST',
    duration: 'Live',
    description: 'Bring questions—chat-driven fixes, refactors, and feature drops.',
  },
  {
    id: 'live-2',
    title: 'Office Hours: Q&A + Debugging',
    href: 'https://www.youtube.com/@GamersCodeLab/live',
    schedule: 'Ad-hoc midweek streams',
    duration: 'Live',
    description: 'Quickfire audits of viewer code and workflow reviews.',
  },
]

const Section = ({ title, eyebrow, id, children }) => (
  <section className="space-y-4" id={id}>
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.18em] text-orange-300/80">{eyebrow}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-orange-500/60 via-amber-400/40 to-transparent" />
    </div>
    <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
    {children}
  </section>
)

const VideoCard = ({ title, href, duration, description, accent, meta }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 px-5 py-4 transition duration-200 hover:-translate-y-1 hover:border-orange-400/80 hover:shadow-[0_18px_40px_rgba(249,115,22,0.18)]"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/0 opacity-0 transition duration-300 group-hover:opacity-100" />
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <p className="text-sm text-orange-300/80 font-semibold">{accent}</p>
        <h3 className="text-lg md:text-xl font-semibold text-white leading-snug">{title}</h3>
        {description && <p className="text-sm text-gray-300/90 leading-relaxed">{description}</p>}
        {meta && <p className="text-xs text-gray-400">{meta}</p>}
      </div>
      <div className="shrink-0 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-200">
        {duration}
      </div>
    </div>
  </a>
)

function Videos() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-12 text-white space-y-12">
      <header className="space-y-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Content Hub</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Latest Videos & Streams</h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Quick access to fresh uploads, shorts for fast tips, deep dives for long-form learning, and upcoming live streams.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <a
            href="#latest"
            className="rounded-full border border-orange-500/60 px-4 py-2 text-orange-100 hover:bg-orange-500/10 transition"
          >
            Latest uploads
          </a>
          <a
            href="#shorts"
            className="rounded-full border border-orange-500/60 px-4 py-2 text-orange-100 hover:bg-orange-500/10 transition"
          >
            Shorts
          </a>
          <a
            href="#longform"
            className="rounded-full border border-orange-500/60 px-4 py-2 text-orange-100 hover:bg-orange-500/10 transition"
          >
            Long form
          </a>
          <a
            href="#live"
            className="rounded-full border border-orange-500/60 px-4 py-2 text-orange-100 hover:bg-orange-500/10 transition"
          >
            Livestreams
          </a>
        </div>
      </header>

      <div className="grid gap-12">
        <Section eyebrow="Fresh drops" title="Latest Videos" id="latest">
          <div className="grid gap-4 md:grid-cols-2">
            {latestUploads.map(item => (
              <VideoCard
                key={item.id}
                title={item.title}
                href={item.href}
                duration={item.duration}
                description={item.description}
                accent="New"
              />
            ))}
          </div>
        </Section>

        <Section eyebrow="Quick hits" title="Shorts" id="shorts">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {shorts.map(item => (
              <VideoCard
                key={item.id}
                title={item.title}
                href={item.href}
                duration={item.duration}
                accent="Short"
              />
            ))}
          </div>
        </Section>

        <Section eyebrow="Deep dives" title="Long Form" id="longform">
          <div className="grid gap-4 md:grid-cols-2">
            {longForm.map(item => (
              <VideoCard
                key={item.id}
                title={item.title}
                href={item.href}
                duration={item.duration}
                description={item.description}
                accent="Long form"
              />
            ))}
          </div>
        </Section>

        <Section eyebrow="Live" title="Livestream" id="live">
          <div className="grid gap-4 md:grid-cols-2">
            {liveStreams.map(item => (
              <VideoCard
                key={item.id}
                title={item.title}
                href={item.href}
                duration={item.duration}
                description={item.description}
                accent={item.schedule}
                meta="Set a reminder on YouTube"
              />
            ))}
          </div>
        </Section>
      </div>

      <div className="mt-6 flex justify-center">
        <a
          href="https://www.youtube.com/@GamersCodeLab"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 font-semibold text-gray-900 shadow-[0_12px_30px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5"
        >
          Visit the channel
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  )
}

export default Videos
