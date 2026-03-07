import React from 'react'
import logo from '../../assets/logo.jpg'
import BlurText from '../common/BlurText'
import DecryptedText from '../common/DecryptedText'
import SpotlightCard from '../common/SpotlightCard'



export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl text-white px-4 sm:px-6 lg:px-10 py-10 md:py-16">
            <div className="grid md:grid-cols-2 items-center min-h-125 gap-10">

                    {/* LEFT SIDE IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src={logo}
                            alt="coding illustration"
                            className="w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full object-cover border-4 border-orange-500 shadow-[0_12px_35px_rgba(0,0,0,0.35)]"
                        />
                    </div>

                    {/* RIGHT SIDE TEXT */}
                    <div className="text-center md:text-right space-y-6 flex flex-col items-center md:items-end">
                        <BlurText
                            text="Gamer's Code Lab"
                            animateBy="words"
                            delay={140}
                            className="text-4xl sm:text-5xl font-bold"
                            direction="top"
                        />

                        <BlurText
                            text="Build. Code. Stream."
                            animateBy="words"
                            delay={110}
                            className="text-orange-500 text-xl sm:text-2xl font-semibold"
                            direction="top"
                        />

                        <DecryptedText
                            text="Hover to decrypt: Code. Learn. Play."
                            speed={60}
                            maxIterations={12}
                            sequential
                            revealDirection="center"
                            parentClassName="inline-block text-gray-300 text-sm"
                            className="text-gray-200"
                            encryptedClassName="text-orange-300"
                            animateOn="hover"
                        />

                        <a
                            href="https://www.youtube.com/@GamersCodeLab"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ease-out mt-8 md:mt-10 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30"
                        >
                            Explore Now
                        </a>
                    </div>

            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
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
    );
}