import React from "react"
import logo from "../../assets/logo.jpg"
import ProfileCard from "../common/ProfileCard"
import BlurText from "../common/BlurText"
import DecryptedText from "../common/DecryptedText"
import SpotlightCard from "../common/SpotlightCard"


export default function About() {
  return (
    <div className="py-20 text-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="rounded-3xl border border-white/10 bg-[#08142e]/45 backdrop-blur-md p-6 md:p-10 space-y-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Hero copy with animations */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <BlurText
              text="About Gamer's Code Lab"
              animateBy="words"
              delay={120}
              direction="top"
              className="text-4xl md:text-5xl font-bold text-white"
            />
            <DecryptedText
              text="Coding in public. Gaming for fun. Shipping real projects."
              speed={60}
              maxIterations={14}
              sequential
              revealDirection="start"
              parentClassName="inline-block text-lg text-gray-300"
              className="text-gray-200"
              encryptedClassName="text-orange-300"
              animateOn="view"
            />
            <p className="text-gray-400">
              I'm Debanjan—dev + gamer building this lab in the open. Tutorials, experiments, and livestreams that show the real process: wins, bugs, refactors.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://www.youtube.com/@GamersCodeLab"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-4 py-2 font-semibold transition-colors"
              >
                Watch on YouTube ↗
              </a>
              <a
                href="https://github.com/Debanjan110d"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 font-semibold text-gray-100 hover:border-orange-500 hover:text-orange-200 transition-colors"
              >
                View GitHub ↗
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <ProfileCard
              name="Debanjan"
              title="Full-stack Developer"
              handle="Debanjan110d"
              status="Online"
              contactText="Contact"
              avatarUrl={logo}
              miniAvatarUrl={logo}
              iconUrl="/assets/demo/iconpattern.png"
              behindGlowColor="hsla(185, 100%, 70%, 0.6)"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,hsla(185, 40%, 45%, 0.55) 0%,hsla(124, 60%, 70%, 0.27) 100%)"
              onContactClick={() => window.open('https://github.com/Debanjan110d', '_blank')}
            />
          </div>
        </div>

        {/* What + Teach */}
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoBlock
            title="What this is"
            items={[
              "Coding tutorials and real project builds",
              "Streams that mix gaming + development",
              "Behind-the-scenes of my learning journey",
            ]}
          />
          <InfoBlock
            title="What I teach"
            items={[
              "JavaScript / TypeScript",
              "React, Vite, and modern UI",
              "Full-stack experiments and dev tools",
            ]}
          />
        </div>

        {/* Philosophy + Community */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Why I do this</h3>
            <ul className="space-y-1 text-gray-300 list-disc list-inside">
              <li>Learning in public—sharing wins and mistakes.</li>
              <li>Building real things instead of just theory.</li>
              <li>Helping other devs grow with me.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Community</h3>
            <p className="text-gray-300">Suggest projects, discuss code, and hang out during livestreams. Discord is coming soon.</p>
          </div>
        </div>

        {/* Stack badges */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {["React", "Next.js", "Vite", "Node.js", "Express", "Tailwind CSS"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-[#0d1a34]/70 px-3 py-1 text-sm text-gray-100"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {["JavaScript", "TypeScript"].map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-white/15 bg-[#0d1a34]/70 px-3 py-1 text-sm text-gray-100"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Spotlights with hover glow */}
        <div className="grid md:grid-cols-2 gap-6">
          <SpotlightCard
            title="Latest Build: GitHub Live Stats"
            subtitle="React + GitHub API"
            description="Live profile metrics, repo stars, and activity charts pulled straight from the GitHub REST API."
            href="/github"
            cta="See the stats"
          />
          <SpotlightCard
            title="Contact Form"
            subtitle="EmailJS + Vite"
            description="Drop a message—now with in-app toasts and env-based EmailJS keys for safer config."
            href="/contact"
            cta="Send a note"
          />
        </div>
        </div>
      </div>
    </div>
  )
}

function InfoBlock({ title, items }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1a34]/60 p-4 shadow">
      <p className="text-sm text-orange-300 font-semibold">{title}</p>
      <ul className="mt-2 space-y-1 text-gray-300 list-disc list-inside">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
