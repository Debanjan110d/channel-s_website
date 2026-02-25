import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl text-white">
            <aside className="relative overflow-hidden bg-gray-900 rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl">
                            Gamer's Code Lab
                            <span className="hidden sm:block text-3xl text-orange-500">
                                Build. Code. Stream.
                            </span>
                        </h2>

                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:bg-orange-800"
                            to="/"
                        >
                            Explore Now
                        </Link>
                    </div>
                </div>
            </aside>

            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">
                Welcome to Gamer's Code Lab
            </h1>
        </div>
    );
}