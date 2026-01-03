import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Build {
  id: number;
  god_id: number;
  god_name: string;
  build_name: string;
  author_name: string;
  role: string;
  description: string;
  votes: number;
}

function BuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/builds")
      .then((res) => res.json())
      .then((data) => {
        setBuilds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching builds:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white w-full">
        <nav className="bg-black border-b border-gray-800 w-full">
          <div className="w-full px-12 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-red-500">SMITE</span>
                <span className="text-gray-100">ARMORY</span>
              </Link>

              <div className="flex gap-6 items-center">
                <Link
                  to="/gods"
                  className="text-gray-300 hover:text-red-500 transition font-medium"
                >
                  Gods
                </Link>
                <Link to="/builds" className="text-red-500 font-medium">
                  Builds
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-400">Loading builds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 w-full">
        <div className="w-full px-12 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-red-500">SMITE</span>
              <span className="text-gray-100">ARMORY</span>
            </Link>

            <div className="flex gap-6 items-center">
              <Link
                to="/gods"
                className="text-gray-300 hover:text-red-500 transition font-medium"
              >
                Gods
              </Link>
              <Link to="/builds" className="text-red-500 font-medium">
                Builds
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="w-full px-12 py-12 border-b border-gray-800">
        <h1 className="text-5xl font-bold mb-4">All Builds</h1>
        <p className="text-xl text-gray-400">
          Browse {builds.length} pro builds and strategies
        </p>
      </div>

      {/* Builds Grid */}
      <div className="w-full px-12 py-12">
        {builds.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No builds available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Link
                key={build.id}
                to={`/builds/${build.id}`}
                className="bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition p-6"
              >
                {/* Build Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 hover:text-red-500 transition">
                      {build.build_name}
                    </h3>
                    <Link
                      to={`/gods/${build.god_id}`}
                      className="text-lg text-purple-400 hover:text-purple-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {build.god_name}
                    </Link>
                  </div>

                  {build.votes > 0 && (
                    <span className="bg-yellow-600 px-3 py-1 rounded font-semibold">
                      ⭐ {build.votes}
                    </span>
                  )}
                </div>

                {/* Build Tags */}
                <div className="flex gap-2 mb-4">
                  {build.role && (
                    <span className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">
                      {build.role}
                    </span>
                  )}
                  {build.author_name && (
                    <span className="bg-green-600 px-3 py-1 rounded text-sm">
                      By {build.author_name}
                    </span>
                  )}
                </div>

                {/* Description */}
                {build.description && (
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {build.description}
                  </p>
                )}

                {/* View Details Button */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <span className="text-red-500 font-semibold">
                    View Full Build →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildsPage;
