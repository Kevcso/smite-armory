import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface God {
  id: number;
  name: string;
  title: string;
  class: string;
  pantheon: string;
}

function ViewGods() {
  const [gods, setGods] = useState<God[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

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

  useEffect(() => {
    fetchGods();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeleting(id);
    const adminPassword = localStorage.getItem("adminPassword");

    try {
      const response = await fetch(`http://localhost:5000/api/gods/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword || "",
        },
      });

      if (response.ok) {
        // Remove the god from the list
        setGods(gods.filter((god) => god.id !== id));
      } else {
        const error = await response.json();
        alert(`Failed to delete god: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      alert("Error connecting to server");
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">All Gods ({gods.length})</h1>
          <Link
            to="/admin/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            Back to Dashboard
          </Link>
        </div>

        {gods.length === 0 ? (
          <p className="text-gray-400">No gods added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gods.map((god) => (
              <div
                key={god.id}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition relative"
              >
                <h2 className="text-2xl font-bold">{god.name}</h2>
                <p className="text-gray-400">{god.title}</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-blue-600 px-3 py-1 rounded text-sm">
                    {god.class}
                  </span>
                  {god.pantheon && (
                    <span className="bg-purple-600 px-3 py-1 rounded text-sm">
                      {god.pantheon}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(god.id, god.name)}
                  disabled={deleting === god.id}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed px-4 py-2 rounded text-sm font-medium transition"
                >
                  {deleting === god.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewGods;
