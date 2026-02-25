export default function GithubStats() {
    return (
        <div className="bg-gray-900 py-20 text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold">
                    GitHub Activity
                </h2>

                <p className="mt-4 text-gray-400">
                    Building consistently. Improving daily.
                </p>

                {/* Main Stats */}
                <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8">

                    <img
                        src="https://github-readme-stats.vercel.app/api?username=Debanjan110d&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true"
                        alt="GitHub Stats"
                        className="rounded-lg shadow-lg"
                    />

                    <img
                        src="https://nirzak-streak-stats.vercel.app/?user=Debanjan110d&theme=tokyonight&hide_border=true"
                        alt="GitHub Streak"
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Top Languages */}
                <div className="mt-12 flex justify-center">
                    <img
                        src="https://github-readme-stats.vercel.app/api/top-langs/?username=Debanjan110d&theme=tokyonight&hide_border=true&layout=compact"
                        alt="Top Languages"
                        className="rounded-lg shadow-lg"
                    />
                </div>

                {/* Trophies */}
                <div className="mt-16">
                    <h3 className="text-2xl font-semibold mb-6">
                        GitHub Trophies
                    </h3>

                    <img
                        src="https://github-profile-trophy.vercel.app/?username=Debanjan110d&theme=radical&no-frame=true&margin-w=10"
                        alt="GitHub Trophies"
                        className="mx-auto"
                    />
                </div>

                {/* Visitor Counter */}
                <div className="mt-16">
                    <img
                        src="https://visitcount.itsvg.in/api?id=Debanjan110d&icon=10&color=13"
                        alt="Profile Views"
                        className="mx-auto"
                    />
                </div>

            </div>
        </div>
    );
}