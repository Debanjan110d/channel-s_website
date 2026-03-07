import React from 'react'

export default function Privacy() {
    return (
        <div className="text-gray-300 py-20">
            <div className="max-w-4xl mx-auto px-6">
                <div className="rounded-3xl border border-white/10 bg-[#08142e]/50 backdrop-blur-md p-6 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

                <h1 className="text-4xl font-bold text-white mb-8">
                    Privacy Policy
                </h1>

                <p className="mb-6">
                    At <span className="text-orange-500">Gamer's Code Lab</span>, your privacy is important.
                    This website is a personal project used to share coding content,
                    projects, and development resources.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
                    Information We Collect
                </h2>

                <p className="mb-6">
                    This website does not directly collect personal data.
                    However, some third-party services embedded on this site
                    (such as GitHub statistics widgets or external links)
                    may collect anonymous usage data.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
                    Third-Party Services
                </h2>

                <p className="mb-6">
                    This website may display content from third-party platforms including:
                </p>

                <ul className="list-disc ml-6 space-y-2">
                    <li>GitHub statistics widgets</li>
                    <li>YouTube content</li>
                    <li>External developer tools</li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
                    External Links
                </h2>

                <p className="mb-6">
                    This website may contain links to external websites.
                    We are not responsible for the privacy policies
                    or content of those external platforms.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">
                    Updates to This Policy
                </h2>

                <p>
                    This privacy policy may be updated occasionally
                    as the website evolves and new features are added.
                </p>

                </div>

            </div>
        </div>
    );
}
