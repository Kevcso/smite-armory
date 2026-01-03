import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

function ViewBuilds() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/builds')
      .then(res => res.json())
      .then(data => {
        setBuilds(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching builds:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Builds ({builds.length})</h1>
          <Link to="/admin/dashboard" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">
            Back to Dashboard
          </Link>
        </div>

        {builds.length === 0 ? (
          <p className="text-gray-400">No builds added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {builds.map(build => (
              <div key={build.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold">{build.build_name}</h2>
                    <p className="text-purple-400 text-lg">{build.god_name}</p>
                  </div>
                  {build.votes > 0 && (
                    <span className="bg-yellow-600 px-3 py-1 rounded">
                      ⭐ {build.votes}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mb-3">
                  {build.role && (
                    <span className="bg-blue-600 px-3 py-1 rounded text-sm">{build.role}</span>
                  )}
                  {build.author_name && (
                    <span className="bg-green-600 px-3 py-1 rounded text-sm">By {build.author_name}</span>
                  )}
                </div>

                {build.description && (
                  <p className="text-gray-400 text-sm mt-3">{build.description}</p>
                )}

                <Link 
                  to={`/admin/builds/${build.id}`}
                  className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBuilds;