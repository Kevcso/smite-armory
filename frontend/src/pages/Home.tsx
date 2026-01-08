import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 w-full">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-red-500">SMITE</span>
              <span className="text-gray-100">ARMORY</span>
            </Link>

            {/* Centered Navigation Links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 items-center">
              <Link
                to="/gods"
                className="text-gray-300 hover:text-red-500 transition font-medium"
              >
                Gods
              </Link>
              <Link
                to="/builds"
                className="text-gray-300 hover:text-red-500 transition font-medium"
              >
                Builds
              </Link>
              <Link
                to="/items"
                className="text-gray-300 hover:text-red-500 transition font-medium"
              >
                Items
              </Link>
            </div>

            {/* Admin link (right side) */}
            <Link
              to="/admin"
              className="text-gray-600 hover:text-gray-400 transition font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-6xl font-bold mb-6">
            Master <span className="text-red-500">Smite 2</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Discover the best god builds, strategies, and gameplay guides for
            Smite 2. Dominate the battleground with expert recommendations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/gods"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Browse Gods
            </Link>
            <Link
              to="/builds"
              className="bg-gray-800 hover:bg-gray-700 text-gray-100 px-8 py-3 rounded-lg font-semibold transition border border-gray-700"
            >
              View Builds
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-red-500 text-4xl mb-4">⚔️</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-100">
                God Database
              </h3>
              <p className="text-gray-400">
                Complete information on every god including abilities, stats,
                and lore.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-red-500 text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-100">
                Pro Builds
              </h3>
              <p className="text-gray-400">
                Curated builds from top players and streamers for every role and
                playstyle.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-red-500 text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-100">
                Meta Analysis
              </h3>
              <p className="text-gray-400">
                Stay updated with the current meta and strongest strategies.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 mt-20 w-full">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500">
          <p>SmiteArmory - Your Smite 2 Strategy Hub</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
