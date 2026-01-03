import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddGod() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    class: '',
    pantheon: '',
    description: '',
    image_url: '',
    passive_name: '',
    passive_description: '',
    ability1_name: '',
    ability1_description: '',
    ability2_name: '',
    ability2_description: '',
    ability3_name: '',
    ability3_description: '',
    ultimate_name: '',
    ultimate_description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const adminPassword = localStorage.getItem('adminPassword');

    try {
      const response = await fetch('http://localhost:5000/api/gods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword || ''
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('God created successfully!');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setError('Failed to create god. Check your admin password.');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New God</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., God of Thunder"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Class *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a class</option>
                  <option value="Assassin">Assassin</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Hunter">Hunter</option>
                  <option value="Mage">Mage</option>
                  <option value="Warrior">Warrior</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Pantheon</label>
                <input
                  type="text"
                  name="pantheon"
                  value={formData.pantheon}
                  onChange={handleChange}
                  placeholder="e.g., Norse, Greek, Egyptian"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Abilities */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Abilities</h2>
            
            <div className="space-y-6">
              {/* Passive */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Passive</h3>
                <input
                  type="text"
                  name="passive_name"
                  value={formData.passive_name}
                  onChange={handleChange}
                  placeholder="Passive name"
                  className="w-full px-4 py-2 mb-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  name="passive_description"
                  value={formData.passive_description}
                  onChange={handleChange}
                  placeholder="Passive description"
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Ability 1 */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Ability 1</h3>
                <input
                  type="text"
                  name="ability1_name"
                  value={formData.ability1_name}
                  onChange={handleChange}
                  placeholder="Ability 1 name"
                  className="w-full px-4 py-2 mb-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  name="ability1_description"
                  value={formData.ability1_description}
                  onChange={handleChange}
                  placeholder="Ability 1 description"
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Ability 2 */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Ability 2</h3>
                <input
                  type="text"
                  name="ability2_name"
                  value={formData.ability2_name}
                  onChange={handleChange}
                  placeholder="Ability 2 name"
                  className="w-full px-4 py-2 mb-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  name="ability2_description"
                  value={formData.ability2_description}
                  onChange={handleChange}
                  placeholder="Ability 2 description"
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Ability 3 */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Ability 3</h3>
                <input
                  type="text"
                  name="ability3_name"
                  value={formData.ability3_name}
                  onChange={handleChange}
                  placeholder="Ability 3 name"
                  className="w-full px-4 py-2 mb-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  name="ability3_description"
                  value={formData.ability3_description}
                  onChange={handleChange}
                  placeholder="Ability 3 description"
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Ultimate */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Ultimate</h3>
                <input
                  type="text"
                  name="ultimate_name"
                  value={formData.ultimate_name}
                  onChange={handleChange}
                  placeholder="Ultimate name"
                  className="w-full px-4 py-2 mb-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  name="ultimate_description"
                  value={formData.ultimate_description}
                  onChange={handleChange}
                  placeholder="Ultimate description"
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          {error && <div className="bg-red-600 p-4 rounded">{error}</div>}
          {success && <div className="bg-green-600 p-4 rounded">{success}</div>}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            >
              Create God
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

export default AddGod;