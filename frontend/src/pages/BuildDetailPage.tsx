import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  tier: number;
  cost: number;
  category: string;
  description: string;
  passive_description: string;
  stats: any;
  position: number;
}

interface Build {
  id: number;
  god_id: number;
  god_name: string;
  build_name: string;
  author_name: string;
  role: string;
  description: string;
  votes: number;
  items: Item[];
}

function BuildDetailPage() {
  const { id } = useParams();
  const [build, setBuild] = useState<Build | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/builds/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBuild(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching build:", err);
        setLoading(false);
      });
  }, [id]);

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
                <Link
                  to="/builds"
                  className="text-gray-300 hover:text-red-500 transition font-medium"
                >
                  Builds
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-400">Loading build...</p>
        </div>
      </div>
    );
  }

  if (!build) {
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
                <Link
                  to="/builds"
                  className="text-gray-300 hover:text-red-500 transition font-medium"
                >
                  Builds
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">Build not found</p>
          <Link
            to="/builds"
            className="text-red-500 hover:underline mt-4 inline-block"
          >
            Back to Builds
          </Link>
        </div>
      </div>
    );
  }

  const totalCost = build.items.reduce((sum, item) => sum + item.cost, 0);

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
              <Link
                to="/builds"
                className="text-gray-300 hover:text-red-500 transition font-medium"
              >
                Builds
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Build Header */}
      <div className="w-full px-12 py-12 border-b border-gray-800">
        <Link
          to="/builds"
          className="text-red-500 hover:underline mb-4 inline-block"
        >
          ← Back to Builds
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold mb-2">{build.build_name}</h1>
            <Link
              to={`/gods/${build.god_id}`}
              className="text-2xl text-purple-400 hover:text-purple-300 mb-4 inline-block"
            >
              For {build.god_name}
            </Link>

            <div className="flex gap-3 mt-4">
              {build.role && (
                <span className="bg-blue-600 px-4 py-2 rounded-lg font-semibold">
                  {build.role}
                </span>
              )}
              {build.author_name && (
                <span className="bg-green-600 px-4 py-2 rounded-lg">
                  By {build.author_name}
                </span>
              )}
              {build.votes > 0 && (
                <span className="bg-yellow-600 px-4 py-2 rounded-lg font-semibold">
                  ⭐ {build.votes} votes
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-900 px-6 py-4 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-sm mb-1">Total Cost</p>
            <p className="text-3xl font-bold text-yellow-500">{totalCost}g</p>
          </div>
        </div>

        {build.description && (
          <p className="text-lg text-gray-300 mt-6 leading-relaxed">
            {build.description}
          </p>
        )}
      </div>

      {/* Items Section */}
      <div className="w-full px-12 py-12">
        <h2 className="text-3xl font-bold mb-8">Build Order</h2>

        {build.items.length === 0 ? (
          <p className="text-gray-400 text-lg">No items in this build.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {build.items.map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
              >
                {/* Item Header */}
                <div className="bg-gray-800 px-6 py-3 flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-500">
                    #{index + 1}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="bg-yellow-600 px-3 py-1 rounded text-sm font-semibold">
                      Tier {item.tier}
                    </span>
                    <span className="bg-green-600 px-3 py-1 rounded text-sm font-semibold">
                      {item.cost}g
                    </span>
                  </div>
                </div>

                {/* Item Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>

                  {item.category && (
                    <span className="inline-block bg-purple-600 px-3 py-1 rounded text-sm mb-4">
                      {item.category}
                    </span>
                  )}

                  {item.description && (
                    <p className="text-gray-300 text-sm mb-4">
                      {item.description}
                    </p>
                  )}

                  {/* Stats */}
                  {item.stats && Object.keys(item.stats).length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-400 mb-2">
                        STATS:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className="bg-gray-800 px-3 py-2 rounded"
                          >
                            <span className="text-gray-400 text-xs capitalize">
                              {key.replace(/_/g, " ")}:
                            </span>
                            <span className="text-white font-semibold ml-2">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passive */}
                  {item.passive_description && (
                    <div className="bg-blue-900/30 border border-blue-800 rounded p-3">
                      <p className="text-xs font-semibold text-blue-400 mb-1">
                        PASSIVE:
                      </p>
                      <p className="text-sm text-gray-300">
                        {item.passive_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildDetailPage;
