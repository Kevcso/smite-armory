import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface God {
  id: number;
  name: string;
  title: string;
  class: string;
  pantheon: string;
  image_url: string;
}

function GodsPage() {
  const [gods, setGods] = useState<God[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/gods")
      .then((res) => res.json())
      .then((data) => {
        setGods(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gods:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <nav className="bg-black border-b border-gray-800 w-full">
          <div className="w-full px-12 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-red-500">SMITE</span>
                <span className="text-gray-100">ARMORY</span>
              </Link>

              <div className="flex gap-6 items-center">
                <Link to="/gods" className="text-red-500 font-medium">
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
          <p className="text-xl text-gray-400">Loading gods...</p>
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
              <Link to="/gods" className="text-red-500 font-medium">
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

      {/* Page Header */}
      <div className="w-full px-12 py-12 border-b border-gray-800">
        <h1 className="text-5xl font-bold mb-4">All Gods</h1>
        <p className="text-xl text-gray-400">
          Browse {gods.length} gods and discover their abilities and builds
        </p>
      </div>

      {/* Gods Grid */}
      <div className="w-full px-12 py-12">
        {gods.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No gods available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {gods.map((god) => (
              <Link
                key={god.id}
                to={`/gods/${god.id}`}
                className="bg-gray-900 rounded-xl border border-gray-800 hover:border-red-500 transition overflow-hidden group"
              >
                {/* God Image */}
                <div className="aspect-square bg-gray-800 overflow-hidden">
                  {god.image_url ? (
                    <img
                      src={god.image_url}
                      alt={god.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      ⚔️
                    </div>
                  )}
                </div>

                {/* God Info */}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition">
                    {god.name}
                  </h3>
                  {god.title && (
                    <p className="text-sm text-gray-400 mb-2">{god.title}</p>
                  )}
                  <div className="flex gap-2">
                    <span className="bg-red-600 px-2 py-1 rounded text-xs font-semibold">
                      {god.class}
                    </span>
                    {god.pantheon && (
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                        {god.pantheon}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GodsPage;
