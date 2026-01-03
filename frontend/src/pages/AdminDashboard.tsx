import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/add-god" className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg transition">
          <h2 className="text-2xl font-bold">Add God</h2>
          <p className="mt-2">Create a new god entry</p>
        </Link>
        
        <Link to="/admin/gods" className="bg-cyan-600 hover:bg-cyan-700 p-6 rounded-lg transition">
          <h2 className="text-2xl font-bold">View Gods</h2>
          <p className="mt-2">See all gods in database</p>
        </Link>
        
        <Link to="/admin/add-item" className="bg-green-600 hover:bg-green-700 p-6 rounded-lg transition">
          <h2 className="text-2xl font-bold">Add Item</h2>
          <p className="mt-2">Create a new item</p>
        </Link>

        <Link to="/admin/items" className="bg-emerald-600 hover:bg-emerald-700 p-6 rounded-lg transition">
          <h2 className="text-2xl font-bold">View Items</h2>
          <p className="mt-2">See all items in database</p>
        </Link>
        
        <Link to="/admin/add-build" className="bg-purple-600 hover:bg-purple-700 p-6 rounded-lg transition">
          <h2 className="text-2xl font-bold">Add Build</h2>
          <p className="mt-2">Create a new god build</p>
        </Link>

        <Link to="/admin/builds" className="bg-violet-600 hover:bg-violet-700 p-6 rounded-lg transition">
          <h2 className="text-2xl font-bold">View Builds</h2>
          <p className="mt-2">See all builds in database</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;