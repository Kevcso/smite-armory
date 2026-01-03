import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface God {
  id: number;
  name: string;
  class: string;
}

interface Item {
  id: number;
  name: string;
  tier: number;
  cost: number;
  category: string;
}

function AddBuild() {
  const navigate = useNavigate();
  const [gods, setGods] = useState<God[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    god_id: '',
    build_name: '',
    author_name: '',
    description: '',
    role: ''
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch gods and items
    Promise.all([
      fetch('http://localhost:5000/api/gods').then(r => r.json()),
      fetch('http://localhost:5000/api/items').then(r => r.json())
    ])
    .then(([godsData, itemsData]) => {
      setGods(godsData);
      setItems(itemsData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setError('Failed to load gods and items');
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleItemSelect = (position: number, itemId: string) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[position] = parseInt(itemId);
    setSelectedItems(newSelectedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Filter out items that weren't selected (0 values)
    const itemIds = selectedItems.filter(id => id > 0);

    if (!formData.god_id) {
      setError('Please select a god');
      return;
    }

    if (itemIds.length === 0) {
      setError('Please select at least one item');
      return;
    }

    const adminPassword = localStorage.getItem('adminPassword');

    const buildData = {
      god_id: parseInt(formData.god_id),
      build_name: formData.build_name,
      author_name: formData.author_name,
      description: formData.description,
      role: formData.role,
      item_ids: itemIds
    };

    try {
      const response = await fetch('http://localhost:5000/api/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword || ''
        },
        body: JSON.stringify(buildData)
      });

      if (response.ok) {
        setSuccess('Build created successfully!');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setError('Failed to create build. Check your admin password.');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Build</h1>

        {gods.length === 0 && (
          <div className="bg-yellow-600 p-4 rounded mb-6">
            No gods available! Please add gods first.
          </div>
        )}

        {items.length === 0 && (
          <div className="bg-yellow-600 p-4 rounded mb-6">
            No items available! Please add items first.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Build Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Select God *</label>
                <select
                  name="god_id"
                  value={formData.god_id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Choose a god...</option>
                  {gods.map(god => (
                    <option key={god.id} value={god.id}>
                      {god.name} ({god.class})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Build Name *</label>
                <input
                  type="text"
                  name="build_name"
                  value={formData.build_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., High Damage Jungle Build"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Author Name</label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  placeholder="Your name or streamer name"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select role...</option>
                  <option value="Jungle">Jungle</option>
                  <option value="Solo">Solo</option>
                  <option value="Mid">Mid</option>
                  <option value="ADC">ADC</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the build strategy, playstyle, etc."
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Item Selection */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Select Items (Up to 6)</h2>
            <p className="text-gray-400 mb-4">Choose items in the order they should be built</p>
            
            <div className="space-y-3">
              {[0, 1, 2, 3, 4, 5].map(position => (
                <div key={position} className="flex items-center gap-4">
                  <span className="text-lg font-bold w-8">#{position + 1}</span>
                  <select
                    value={selectedItems[position]}
                    onChange={(e) => handleItemSelect(position, e.target.value)}
                    className="flex-1 px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500"
                  >
                    <option value="0">- No item selected -</option>
                    {items.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} (Tier {item.tier}, {item.cost}g) - {item.category}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          {error && <div className="bg-red-600 p-4 rounded">{error}</div>}
          {success && <div className="bg-green-600 p-4 rounded">{success}</div>}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition"
              disabled={gods.length === 0 || items.length === 0}
            >
              Create Build
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBuild;