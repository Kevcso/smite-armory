import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

interface God {
  id: number;
  name: string;
  title: string;
  class: string;
  pantheon: string;
  image_url: string;
  role: string;
}

function GodsPage() {
  const [gods, setGods] = useState<God[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPantheon, setSelectedPantheon] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");

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

  // Get unique pantheons and define roles
  const pantheons = [
    "All",
    ...new Set(gods.map((g) => g.pantheon).filter(Boolean)),
  ];
  const roles = ["All", "Solo", "Jungle", "Mid", "ADC", "Support"];

  // Filter gods
  const filteredGods = useMemo(() => {
    return gods.filter((god) => {
      const matchesSearch =
        god.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        god.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPantheon =
        selectedPantheon === "All" || god.pantheon === selectedPantheon;
      const matchesRole = selectedRole === "All" || god.role === selectedRole;
      return matchesSearch && matchesPantheon && matchesRole;
    });
  }, [searchTerm, selectedPantheon, selectedRole, gods]);

  const getClassColor = (role: string) => {
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
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navigation */}
        <nav className="bg-black border-b border-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="min-h-screen bg-gray-950 text-white">
              {/* Navigation */}
              <nav className="bg-black border-b border-gray-800 w-full">
                <div className="max-w-7xl mx-auto px-6 py-4">
                  <div className="flex justify-between items-center relative">
                    <Link to="/" className="text-2xl font-bold">
                      <span className="text-red-500">SMITE</span>
                      <span className="text-gray-100">ARMORY</span>
                    </Link>

                    {/* Centered Navigation Links */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 items-center">
                      <Link
                        to="/gods"
                        className="text-red-500 font-medium pb-1 border-b-2 border-red-500"
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
            </div>
          </div>
        </nav>

        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-400">Loading gods...</p>
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

            {/* Centered Navigation Links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 items-center">
              <Link
                to="/gods"
                className="text-red-500 font-medium pb-1 border-b-2 border-red-500"
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

      {/* Page Header with Search and Filters */}
      <div className="w-full border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">All Gods</h1>
            <p className="text-gray-400">
              Browse {gods.length} gods and discover their abilities and builds
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Search Bar */}
            <div className="flex-1 min-w-[300px]">
              <input
                type="text"
                placeholder="Search gods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Pantheon Filter */}
            <select
              value={selectedPantheon}
              onChange={(e) => setSelectedPantheon(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {pantheons.map((pantheon) => (
                <option key={pantheon} value={pantheon}>
                  {pantheon === "All" ? "All Pantheons" : pantheon}
                </option>
              ))}
            </select>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 cursor-pointer"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "All Roles" : role}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gods Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-4 text-gray-400">
          Showing {filteredGods.length}{" "}
          {filteredGods.length === 1 ? "god" : "gods"}
        </div>

        {filteredGods.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No gods found matching your filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredGods.map((god) => (
              <Link
                key={god.id}
                to={`/gods/${god.id}`}
                className="bg-gray-900 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 overflow-hidden group relative"
              >
                {/* God Image - Square */}
                <div className="aspect-square bg-gray-800 overflow-hidden">
                  {god.image_url ? (
                    <img
                      src={god.image_url}
                      alt={god.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      ⚔️
                    </div>
                  )}
                </div>

                {/* God Info */}
                <div className="p-3 relative">
                  <h3 className="font-bold text-base mb-1 group-hover:text-red-500 transition truncate">
                    {god.name}
                  </h3>
                  {god.title && (
                    <p className="text-xs text-gray-400 mb-2 truncate">
                      {god.title}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {god.pantheon && (
                      <div className="inline-block bg-gray-700 px-2 py-1 rounded text-xs">
                        {god.pantheon}
                      </div>
                    )}
                    {/* Role Badge on Bottom-Right */}
                    {god.role && (
                      <div
                        className={`${getClassColor(
                          god.role
                        )} px-2 py-1 rounded text-xs font-semibold shadow-lg`}
                      >
                        {god.role}
                      </div>
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
