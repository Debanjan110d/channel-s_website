import React, { useRef, useState } from 'react'
import { Link, NavLink, useFetcher } from 'react-router-dom'
import logo from '../../assets/logo.jpg'

function PrefetchNavLink({ to, onClick, className, prefetch = false, children }) {
    const fetcher = useFetcher()
    const hasPrefetchedRef = useRef(false)

    const prefetchRoute = () => {
        if (!prefetch || hasPrefetchedRef.current) return
        hasPrefetchedRef.current = true
        fetcher.load(to)
    }

    return (
        <NavLink
            to={to}
            onClick={onClick}
            onMouseEnter={prefetchRoute}
            onFocus={prefetchRoute}
            onTouchStart={prefetchRoute}
            className={className}
        >
            {children}
        </NavLink>
    )
}


export default function Header() {
    const [open, setOpen] = useState(false)

    const closeMenu = () => setOpen(false)

    return (
        <header className="sticky z-50 top-0 border-b border-white/10 bg-[#071326]/70 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <nav className="px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                    <Link to="/" className="flex items-center" onClick={closeMenu}>
                        <img
                            src={logo}
                            className="mr-3 h-14 w-14 rounded-full object-cover border-2 border-orange-500 shadow-md"
                            alt="Logo"
                        />
                    </Link>

                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg lg:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        aria-controls="mobile-menu"
                        aria-expanded={open}
                        onClick={() => setOpen(prev => !prev)}
                    >
                        <span className="sr-only">Open navigation</span>
                        <svg
                            className={`w-7 h-7 text-gray-200 transition-all duration-200 ${open ? 'text-orange-400' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            {/* Left bracket */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-200 ${open ? '-translate-x-0.5' : ''}`}
                                d="M8 6L4 12l4 6"
                            />
                            {/* Right bracket */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-200 ${open ? 'translate-x-0.5' : ''}`}
                                d="M16 6l4 6-4 6"
                            />
                            {/* Slash appears when open */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-all duration-200 ${open ? 'opacity-100' : 'opacity-0 translate-y-1'}`}
                                d="M10 6l4 12"
                            />
                        </svg>
                    </button>

                    <div
                        className={`${open ? 'flex' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
                        id="mobile-menu"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 w-full lg:w-auto">
                            <li>
                                <PrefetchNavLink
                                    to="/"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? 'text-orange-400' : 'text-gray-200'} border-white/10 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                                    }
                                >
                                    Home
                                </PrefetchNavLink>
                            </li>
                            <li>
                                <PrefetchNavLink
                                    to="/about"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? 'text-orange-400' : 'text-gray-200'} border-white/10 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                                    }
                                >
                                    About
                                </PrefetchNavLink>
                            </li>
                            <li>
                                <PrefetchNavLink
                                    to="/contact"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? 'text-orange-400' : 'text-gray-200'} border-white/10 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                                    }
                                >
                                    Contact
                                </PrefetchNavLink>
                            </li>
                            <li>
                                <PrefetchNavLink
                                    to="/videos"
                                    prefetch
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? 'text-orange-400' : 'text-gray-200'} border-white/10 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                                    }
                                >
                                    Latest Videos
                                </PrefetchNavLink>
                            </li>
                            <li>
                                <PrefetchNavLink
                                    to="/shorts"
                                    prefetch
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? 'text-orange-400' : 'text-gray-200'} border-white/10 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                                    }
                                >
                                    Shorts
                                </PrefetchNavLink>
                            </li>
                            <li>
                                <PrefetchNavLink
                                    to="/github"
                                    prefetch
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b ${isActive ? 'text-orange-400' : 'text-gray-200'} border-white/10 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 hover:text-orange-400 lg:p-0`
                                    }
                                >
                                    GithubStats
                                </PrefetchNavLink>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

