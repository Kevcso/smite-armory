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
  stats: any;
  image_url: string;
}

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTier, setSelectedTier] = useState("All");
  const [selectedStats, setSelectedStats] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched items:", data);
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
  ].filter(
    (cat) =>
      !cat.includes("Tier I") &&
      !cat.includes("Tier II") &&
      !cat.includes("Tier III") &&
      cat !== "All Tiers"
  );
  const tiers = ["All", "1", "2", "3"];

  // Stats for filtering - ALL stats that exist in database
  const statTypes = [
    "Strength",
    "Intelligence",
    "Basic Attack Power",
    "Physical Protection",
    "Magical Protection",
    "Max Health",
    "Max Mana",
    "Health Regen",
    "Mana Regen",
    "Cooldown Rate",
    "Movement Speed",
    "Attack Speed",
    "Lifesteal",
    "Critical Chance",
    "Penetration",
  ];

  const toggleStat = (stat: string) => {
    if (selectedStats.includes(stat)) {
      setSelectedStats(selectedStats.filter((s) => s !== stat));
    } else {
      setSelectedStats([...selectedStats, stat]);
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesTier =
        selectedTier === "All" || item.tier?.toString() === selectedTier;

      // Check if item has ALL of the selected stats (check both stats object AND passive description)
      let matchesStats = true;
      if (selectedStats.length > 0) {
        matchesStats = selectedStats.every((stat) => {
          const statLower = stat.toLowerCase();

          // Check in stats object
          const itemStatsStr = item.stats
            ? JSON.stringify(item.stats).toLowerCase()
            : "";
          const inStats = itemStatsStr.includes(statLower);

          // Check in passive description
          const passiveStr = item.passive_description
            ? item.passive_description.toLowerCase()
            : "";
          const inPassive = passiveStr.includes(statLower);

          // Special case for Penetration
          let penMatch = false;
          if (statLower.includes("penetration")) {
            // Match: "Penetration" in stats/passive OR protection reduction passives
            const hasPenetrationKeyword = inStats || inPassive;

            // Match protection reduction patterns
            const hasMinusProtection =
              passiveStr.includes("-") && passiveStr.includes("protection");
            const hasPiercing = passiveStr.includes("piercing");

            // Exclude items that scale off YOUR protections (not "per your level")
            const isYourProtections =
              (passiveStr.includes("your item") ||
                passiveStr.includes("of your") ||
                passiveStr.includes("your protection")) &&
              passiveStr.includes("protection");
            const isAllyBuff =
              (passiveStr.includes("allied") ||
                (passiveStr.includes(" buff") &&
                  !passiveStr.includes("debuff"))) &&
              passiveStr.includes("protection");
            const isShieldReduction =
              passiveStr.includes("shield") &&
              !passiveStr.includes("void shield");

            penMatch =
              (hasPenetrationKeyword || hasMinusProtection || hasPiercing) &&
              !isYourProtections &&
              !isAllyBuff &&
              !isShieldReduction;
          }

          // Item matches if stat is in stats, passive, OR pen match
          return inStats || inPassive || penMatch;
        });
      }

      return matchesSearch && matchesCategory && matchesTier && matchesStats;
    });
  }, [searchTerm, selectedCategory, selectedTier, selectedStats, items]);

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

              <div className="invisible">Admin</div>
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

            <div className="invisible">Admin</div>
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

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

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

            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 cursor-pointer"
            >
              <option value="All">All Tiers</option>
              {tiers
                .filter((t) => t !== "All")
                .map((tier) => (
                  <option key={tier} value={tier}>
                    Tier {tier}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Stat Filters */}
          <div className="w-48 flex-shrink-0">
            <h3 className="text-sm font-bold mb-3 text-gray-400 uppercase">
              Filter by Stats
            </h3>
            <div className="space-y-2">
              {statTypes.map((stat) => (
                <button
                  key={stat}
                  onClick={() => toggleStat(stat)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                    selectedStats.includes(stat)
                      ? "bg-red-600 text-white font-semibold"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {stat}
                </button>
              ))}
            </div>

            {selectedStats.length > 0 && (
              <button
                onClick={() => setSelectedStats([])}
                className="w-full mt-4 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Items Grid */}
          <div className="flex-1">
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
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-200 overflow-visible group"
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
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🗡️
                        </div>
                      )}

                      {/* Tier Badge */}
                      {item.tier && item.tier > 0 && (
                        <div className="absolute top-1 left-1 bg-purple-600 px-1.5 py-0.5 rounded text-xs font-bold">
                          T{item.tier}
                        </div>
                      )}

                      {/* Cost Badge */}
                      {item.cost > 0 && (
                        <div className="absolute bottom-1 right-1 bg-yellow-600 px-1.5 py-0.5 rounded text-xs font-bold">
                          {item.cost}
                        </div>
                      )}
                    </div>

                    {/* Item Name */}
                    <div className="p-1.5">
                      <p className="text-xs font-semibold group-hover:text-red-500 transition truncate text-center">
                        {item.name}
                      </p>
                    </div>

                    {/* Tooltip - In-game style */}
                    <div
                      className="hidden group-hover:block fixed z-[9999] pointer-events-none"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "400px",
                        width: "max-content",
                      }}
                    >
                      <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-yellow-600 rounded-lg p-4 shadow-2xl">
                        {/* Item Name and Cost */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-gray-700">
                          <h4 className="text-xl font-bold text-yellow-500">
                            {item.name}
                          </h4>
                          {item.cost > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-600 text-2xl">
                                💰
                              </span>
                              <span className="text-xl font-bold text-yellow-400">
                                {item.cost}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Stats Section */}
                        {item.stats &&
                          typeof item.stats === "object" &&
                          Object.keys(item.stats).length > 0 && (
                            <div className="mb-3">
                              {Object.entries(item.stats).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex items-center gap-2 mb-1"
                                  >
                                    <span className="text-green-400 font-semibold">
                                      {key}:
                                    </span>
                                    <span className="text-white font-bold">
                                      +{String(value)}
                                      {key.toLowerCase().includes("percent") ||
                                      key.toLowerCase().includes("%")
                                        ? "%"
                                        : ""}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                        {/* Passive Effect */}
                        {item.passive_description && (
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                              {item.passive_description}
                            </p>
                          </div>
                        )}

                        {/* Category */}
                        <div className="mt-3 pt-2 border-t border-gray-800">
                          <span className="text-xs text-gray-400 italic">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;
