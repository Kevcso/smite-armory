import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    tier: 1,
    cost: 0,
    category: '',
    description: '',
    passive_description: '',
    image_url: '',
    // Stats as individual fields for easier input
    power: 0,
    attack_speed: 0,
    physical_protection: 0,
    magical_protection: 0,
    health: 0,
    mana: 0,
    hp5: 0,
    mp5: 0,
    cooldown_reduction: 0,
    penetration: 0,
    critical_chance: 0,
    lifesteal: 0,
    movement_speed: 0
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const adminPassword = localStorage.getItem('adminPassword');

    // Build stats object from individual fields (only include non-zero values)
    const stats: any = {};
    if (formData.power) stats.power = formData.power;
    if (formData.attack_speed) stats.attack_speed = formData.attack_speed;
    if (formData.physical_protection) stats.physical_protection = formData.physical_protection;
    if (formData.magical_protection) stats.magical_protection = formData.magical_protection;
    if (formData.health) stats.health = formData.health;
    if (formData.mana) stats.mana = formData.mana;
    if (formData.hp5) stats.hp5 = formData.hp5;
    if (formData.mp5) stats.mp5 = formData.mp5;
    if (formData.cooldown_reduction) stats.cooldown_reduction = formData.cooldown_reduction;
    if (formData.penetration) stats.penetration = formData.penetration;
    if (formData.critical_chance) stats.critical_chance = formData.critical_chance;
    if (formData.lifesteal) stats.lifesteal = formData.lifesteal;
    if (formData.movement_speed) stats.movement_speed = formData.movement_speed;

    const itemData = {
      name: formData.name,
      tier: formData.tier,
      cost: formData.cost,
      category: formData.category,
      description: formData.description,
      passive_description: formData.passive_description,
      image_url: formData.image_url,
      stats: stats
    };

    try {
      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword || ''
        },
        body: JSON.stringify(itemData)
      });

      if (response.ok) {
        setSuccess('Item created successfully!');
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        setError('Failed to create item. Check your admin password.');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Item</h1>

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

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Tier *</label>
                  <input
                    type="number"
                    name="tier"
                    value={formData.tier}
                    onChange={handleChange}
                    min="1"
                    max="4"
                    required
                    className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2">Cost (Gold) *</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Physical">Physical</option>
                    <option value="Magical">Magical</option>
                    <option value="Defense">Defense</option>
                    <option value="Utility">Utility</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Passive Description</label>
                <textarea
                  name="passive_description"
                  value={formData.passive_description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Item passive effect (if any)"
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

          {/* Stats */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Item Stats</h2>
            <p className="text-gray-400 mb-4">Leave at 0 for stats that don't apply</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Power</label>
                <input
                  type="number"
                  name="power"
                  value={formData.power}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Attack Speed (%)</label>
                <input
                  type="number"
                  name="attack_speed"
                  value={formData.attack_speed}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Physical Protection</label>
                <input
                  type="number"
                  name="physical_protection"
                  value={formData.physical_protection}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Magical Protection</label>
                <input
                  type="number"
                  name="magical_protection"
                  value={formData.magical_protection}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Health</label>
                <input
                  type="number"
                  name="health"
                  value={formData.health}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Mana</label>
                <input
                  type="number"
                  name="mana"
                  value={formData.mana}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">HP5</label>
                <input
                  type="number"
                  name="hp5"
                  value={formData.hp5}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">MP5</label>
                <input
                  type="number"
                  name="mp5"
                  value={formData.mp5}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">CDR (%)</label>
                <input
                  type="number"
                  name="cooldown_reduction"
                  value={formData.cooldown_reduction}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Penetration</label>
                <input
                  type="number"
                  name="penetration"
                  value={formData.penetration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Critical Chance (%)</label>
                <input
                  type="number"
                  name="critical_chance"
                  value={formData.critical_chance}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Lifesteal (%)</label>
                <input
                  type="number"
                  name="lifesteal"
                  value={formData.lifesteal}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2">Movement Speed (%)</label>
                <input
                  type="number"
                  name="movement_speed"
                  value={formData.movement_speed}
                  onChange={handleChange}
                  step="0.1"
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
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition"
            >
              Create Item
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

export default AddItem;