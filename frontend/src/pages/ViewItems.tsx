import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Item {
  id: number;
  name: string;
  tier: number;
  cost: number;
  category: string;
  description: string;
  stats: any;
}

function ViewItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Items ({items.length})</h1>
          <Link to="/admin/dashboard" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">
            Back to Dashboard
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-400">No items added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition">
                <h2 className="text-2xl font-bold">{item.name}</h2>
                <div className="mt-2 flex gap-2 items-center">
                  <span className="bg-yellow-600 px-3 py-1 rounded text-sm">Tier {item.tier}</span>
                  <span className="bg-green-600 px-3 py-1 rounded text-sm">{item.cost}g</span>
                  {item.category && (
                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">{item.category}</span>
                  )}
                </div>
                {item.description && (
                  <p className="text-gray-400 mt-3 text-sm">{item.description}</p>
                )}
                {item.stats && Object.keys(item.stats).length > 0 && (
                  <div className="mt-4 text-sm">
                    <p className="font-semibold mb-1">Stats:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(item.stats).map(([key, value]) => (
                        <span key={key} className="bg-gray-700 px-2 py-1 rounded text-xs">
                          {key}: {String(value)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewItems;