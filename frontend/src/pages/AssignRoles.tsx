import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface God {
  id: number;
  name: string;
  title: string;
  class: string;
  pantheon: string;
  role: string | null;
  image_url: string;
}

function AssignRoles() {
  const [gods, setGods] = useState<God[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const roles = ["Solo", "Jungle", "Mid", "Carry", "Support"];

  useEffect(() => {
    fetchGods();
  }, []);

  const fetchGods = () => {
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
  };

  const updateRole = async (godId: number, role: string) => {
    setUpdating(godId);
    const adminPassword = localStorage.getItem("adminPassword");

    try {
      const response = await fetch(
        `http://localhost:5000/api/gods/${godId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-password": adminPassword || "",
          },
          body: JSON.stringify({ role }),
        }
      );

      if (response.ok) {
        // Update local state
        setGods(gods.map((god) => (god.id === godId ? { ...god, role } : god)));
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setUpdating(null);
    }
  };

  const getRoleColor = (role: string | null) => {
    if (!role) return "bg-gray-700";
    const colors: Record<string, string> = {
      Solo: "bg-red-600",
      Jungle: "bg-purple-600",
      Mid: "bg-blue-600",
      Carry: "bg-green-600",
      Support: "bg-yellow-600",
    };
    return colors[role] || "bg-gray-600";
  };

  const filteredGods = gods.filter((god) => {
    if (filter === "All") return true;
    if (filter === "Unassigned") return !god.role;
    return god.role === filter;
  });

  const stats = {
    total: gods.length,
    assigned: gods.filter((g) => g.role).length,
    unassigned: gods.filter((g) => !g.role).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <p>Loading gods...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Assign God Roles</h1>
            <p className="text-gray-400">
              Assign roles to gods for better filtering and organization
            </p>
          </div>
          <Link
            to="/admin/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Gods</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-green-900 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Assigned</p>
            <p className="text-3xl font-bold">{stats.assigned}</p>
          </div>
          <div className="bg-red-900 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Unassigned</p>
            <p className="text-3xl font-bold">{stats.unassigned}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="All">All Gods ({gods.length})</option>
            <option value="Unassigned">Unassigned ({stats.unassigned})</option>
            <option value="Solo">Solo</option>
            <option value="Jungle">Jungle</option>
            <option value="Mid">Mid</option>
            <option value="Carry">Carry</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Gods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGods.map((god) => (
            <div
              key={god.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              {/* God Header */}
              <div className="flex items-center gap-4 p-4 bg-gray-750">
                <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  {god.image_url ? (
                    <img
                      src={god.image_url}
                      alt={god.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      ⚔️
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate">{god.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{god.title}</p>
                  {god.pantheon && (
                    <span className="inline-block bg-purple-600 px-2 py-0.5 rounded text-xs mt-1">
                      {god.pantheon}
                    </span>
                  )}
                </div>
              </div>

              {/* Current Role */}
              <div className="px-4 py-3 bg-gray-850">
                <p className="text-xs text-gray-400 mb-2">Current Role:</p>
                <div
                  className={`${getRoleColor(
                    god.role
                  )} px-3 py-1 rounded text-sm font-semibold inline-block`}
                >
                  {god.role || "Not Assigned"}
                </div>
              </div>

              {/* Role Buttons */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-gray-400 mb-2">Assign Role:</p>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => updateRole(god.id, role)}
                      disabled={updating === god.id}
                      className={`
                        ${getRoleColor(role)} 
                        hover:opacity-80 
                        px-3 py-2 rounded text-sm font-medium transition
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${god.role === role ? "ring-2 ring-white" : ""}
                      `}
                    >
                      {updating === god.id ? "..." : role}
                    </button>
                  ))}
                  <button
                    onClick={() => updateRole(god.id, "")}
                    disabled={updating === god.id}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm transition disabled:opacity-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGods.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No gods found with selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignRoles;
