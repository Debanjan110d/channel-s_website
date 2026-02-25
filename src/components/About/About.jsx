import React from 'react'




export default function About() {
    return (
        <div className="py-20 bg-gray-900 text-gray-300">
            <div className="container mx-auto px-6 md:px-12 xl:px-6">
                <div className="space-y-12 md:space-y-0 md:flex md:gap-10 lg:items-center">

                    {/* Image Section */}
                    <div className="md:w-5/12">
                        <img
                            src="./logo.jpg"
                            alt="about"
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="md:w-7/12">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            React development by passionate creators
                        </h2>

                        <p className="mt-6 text-gray-400 text-lg">
                            Gamer's Code Lab is focused on real-world coding,
                            building actual projects, and improving step by step.
                        </p>

                        <p className="mt-4 text-gray-400">
                            No fake tutorials. No copied code.
                            Just practical development and real learning.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}