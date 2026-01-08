import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

interface God {
  id: number;
  name: string;
  title: string;
  class: string;
  pantheon: string;
  description: string;
  image_url: string;
  role: string;
  passive_name: string;
  passive_description: string;
  ability1_name: string;
  ability1_description: string;
  ability2_name: string;
  ability2_description: string;
  ability3_name: string;
  ability3_description: string;
  ultimate_name: string;
  ultimate_description: string;
}

interface Build {
  id: number;
  build_name: string;
  author_name: string;
  role: string;
  votes: number;
}

function GodDetailPage() {
  const { id } = useParams();
  const [god, setGod] = useState<God | null>(null);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:5000/api/gods/${id}`).then((r) => r.json()),
      fetch(`http://localhost:5000/api/builds/god/${id}`).then((r) => r.json()),
    ])
      .then(([godData, buildsData]) => {
        setGod(godData);
        setBuilds(buildsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching god:", err);
        setLoading(false);
      });
  }, [id]);

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      Solo: "bg-red-600",
      Jungle: "bg-purple-600",
      Mid: "bg-blue-600",
      Carry: "bg-green-600",
      Support: "bg-yellow-600",
    };
    return colors[role] || "bg-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white w-full">
        <nav className="bg-black border-b border-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-red-500">SMITE</span>
                <span className="text-gray-100">ARMORY</span>
              </Link>

              <div className="flex gap-8 items-center">
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
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!god) {
    return (
      <div className="min-h-screen bg-gray-950 text-white w-full">
        <nav className="bg-black border-b border-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-red-500">SMITE</span>
                <span className="text-gray-100">ARMORY</span>
              </Link>

              <div className="flex gap-8 items-center">
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
            </div>
          </div>
        </nav>
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">God not found</p>
          <Link
            to="/gods"
            className="text-red-500 hover:underline mt-4 inline-block"
          >
            Back to Gods
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white w-full">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 w-full">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-red-500">SMITE</span>
              <span className="text-gray-100">ARMORY</span>
            </Link>

            <div className="flex gap-8 items-center">
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
          </div>
        </div>
      </nav>

      {/* God Header */}
      <div className="w-full border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            to="/gods"
            className="text-red-500 hover:underline mb-6 inline-block"
          >
            ← Back to Gods
          </Link>

          <div className="flex gap-8 items-start">
            {/* God Image */}
            <div className="w-64 h-64 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex-shrink-0">
              {god.image_url ? (
                <img
                  src={god.image_url}
                  alt={god.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  ⚔️
                </div>
              )}
            </div>

            {/* God Info */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-2">{god.name}</h1>
              {god.title && (
                <p className="text-2xl text-gray-400 mb-4">{god.title}</p>
              )}

              <div className="flex gap-3 mb-6">
                {god.role && (
                  <span
                    className={`${getRoleColor(
                      god.role
                    )} px-4 py-2 rounded-lg font-semibold`}
                  >
                    {god.role}
                  </span>
                )}
                {god.pantheon && (
                  <span className="bg-purple-600 px-4 py-2 rounded-lg">
                    {god.pantheon}
                  </span>
                )}
              </div>

              {god.description && (
                <p className="text-lg text-gray-300 leading-relaxed">
                  {god.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Abilities Section */}
      <div className="w-full border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">Abilities</h2>

          <div className="space-y-6">
            {/* Passive */}
            {god.passive_name && (
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-yellow-600 px-3 py-1 rounded text-sm font-semibold">
                    PASSIVE
                  </span>
                  <h3 className="text-xl font-bold">{god.passive_name}</h3>
                </div>
                {god.passive_description && (
                  <p className="text-gray-300">{god.passive_description}</p>
                )}
              </div>
            )}

            {/* Ability 1 */}
            {god.ability1_name && (
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">
                    ABILITY 1
                  </span>
                  <h3 className="text-xl font-bold">{god.ability1_name}</h3>
                </div>
                {god.ability1_description && (
                  <p className="text-gray-300">{god.ability1_description}</p>
                )}
              </div>
            )}

            {/* Ability 2 */}
            {god.ability2_name && (
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">
                    ABILITY 2
                  </span>
                  <h3 className="text-xl font-bold">{god.ability2_name}</h3>
                </div>
                {god.ability2_description && (
                  <p className="text-gray-300">{god.ability2_description}</p>
                )}
              </div>
            )}

            {/* Ability 3 */}
            {god.ability3_name && (
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 px-3 py-1 rounded text-sm font-semibold">
                    ABILITY 3
                  </span>
                  <h3 className="text-xl font-bold">{god.ability3_name}</h3>
                </div>
                {god.ability3_description && (
                  <p className="text-gray-300">{god.ability3_description}</p>
                )}
              </div>
            )}

            {/* Ultimate */}
            {god.ultimate_name && (
              <div className="bg-gray-900 p-6 rounded-xl border border-red-900">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                    ULTIMATE
                  </span>
                  <h3 className="text-xl font-bold">{god.ultimate_name}</h3>
                </div>
                {god.ultimate_description && (
                  <p className="text-gray-300">{god.ultimate_description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Builds Section */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">Builds for {god.name}</h2>

          {builds.length === 0 ? (
            <p className="text-gray-400 text-lg">
              No builds available for this god yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builds.map((build) => (
                <Link
                  key={build.id}
                  to={`/builds/${build.id}`}
                  className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-red-500 transition"
                >
                  <h3 className="text-xl font-bold mb-3">{build.build_name}</h3>

                  <div className="flex gap-2 mb-3">
                    {build.role && (
                      <span className="bg-blue-600 px-3 py-1 rounded text-sm">
                        {build.role}
                      </span>
                    )}
                    {build.votes > 0 && (
                      <span className="bg-yellow-600 px-3 py-1 rounded text-sm">
                        ⭐ {build.votes}
                      </span>
                    )}
                  </div>

                  {build.author_name && (
                    <p className="text-gray-400 text-sm">
                      By {build.author_name}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GodDetailPage;
