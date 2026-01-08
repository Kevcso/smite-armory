import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  tier: number;
  cost: number;
  category: string;
  description: string;
  passive_description: string;
  stats: any; // JSON object from database
  image_url: string;
}

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items:", data); // Debug log
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(items.map((i) => i.category).filter(Boolean)),
  ];
  const tiers = ["All", "1", "2", "3", "4"];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesTier =
        selectedTier === "All" || item.tier?.toString() === selectedTier;
      return matchesSearch && matchesCategory && matchesTier;
    });
  }, [searchTerm, selectedCategory, selectedTier, items]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white w-full">
        <nav className="bg-black border-b border-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center relative">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-red-500">SMITE</span>
                <span className="text-gray-100">ARMORY</span>
              </Link>

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
                  className="text-red-500 font-medium pb-1 border-b-2 border-red-500"
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
            <p className="text-xl text-gray-400">Loading items...</p>
          </div>
        </div>
      </div>
    );
  }

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
                className="text-red-500 font-medium pb-1 border-b-2 border-red-500"
              >
                Items
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header with Search */}
      <div className="w-full border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">All Items</h1>
            <p className="text-gray-400">
              Browse {items.length} items and equipment
            </p>
          </div>

          {/* Search and Filters - Same layout as Gods page */}
          <div className="flex flex-wrap gap-4">
            {/* Search Bar */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* Tier Filter */}
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="All">All Tiers</option>
              {tiers.map((tier) => (
                <option key={tier} value={tier}>
                  Tier {tier}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-4 text-gray-400">
          Showing {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "item" : "items"}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No items found matching your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 overflow-hidden group cursor-pointer"
              >
                {/* Item Image */}
                <div className="aspect-square bg-gray-800 overflow-hidden relative">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🗡️
                    </div>
                  )}

                  {/* Tier Badge */}
                  {item.tier && (
                    <div className="absolute top-2 left-2 bg-purple-600 px-2 py-1 rounded text-xs font-semibold">
                      T{item.tier}
                    </div>
                  )}

                  {/* Cost Badge */}
                  {item.cost && (
                    <div className="absolute bottom-2 right-2 bg-yellow-600 px-2 py-1 rounded text-xs font-semibold">
                      {item.cost}g
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1 group-hover:text-red-500 transition truncate">
                    {item.name}
                  </h3>
                  {item.category && (
                    <div className="inline-block bg-gray-700 px-2 py-0.5 rounded text-xs">
                      {item.category}
                    </div>
                  )}
                </div>

                {/* Hover Tooltip - Stats */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 border border-gray-700 rounded-lg p-3 z-10 shadow-xl pointer-events-none">
                  <h4 className="font-bold text-sm mb-2 text-red-500">
                    {item.name}
                  </h4>
                  {item.stats && typeof item.stats === "object" && (
                    <div className="text-xs text-green-400 mb-2">
                      {Object.entries(item.stats).map(([key, value]) => (
                        <div key={key}>
                          {key}: +{String(value)}
                        </div>
                      ))}
                    </div>
                  )}
                  {item.passive_description && (
                    <p className="text-xs text-purple-300 mb-2 italic">
                      Passive: {item.passive_description}
                    </p>
                  )}
                  {item.description && (
                    <p className="text-xs text-gray-400">{item.description}</p>
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

export default ItemsPage;
