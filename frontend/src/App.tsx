import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GodsPage from "./pages/GodsPage";
import GodDetailPage from "./pages/GodDetailPage";
import BuildsPage from "./pages/BuildsPage";
import BuildDetailPage from "./pages/BuildDetailPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddGod from "./pages/AddGod";
import ViewGods from "./pages/ViewGods";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";
import AddBuild from "./pages/AddBuild";
import ViewBuilds from "./pages/ViewBuilds";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gods" element={<GodsPage />} />
      <Route path="/gods/:id" element={<GodDetailPage />} />
      <Route path="/builds" element={<BuildsPage />} />
      <Route path="/builds/:id" element={<BuildDetailPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-god" element={<AddGod />} />
      <Route path="/admin/gods" element={<ViewGods />} />
      <Route path="/admin/add-item" element={<AddItem />} />
      <Route path="/admin/items" element={<ViewItems />} />
      <Route path="/admin/add-build" element={<AddBuild />} />
      <Route path="/admin/builds" element={<ViewBuilds />} />
    </Routes>
  );
}

export default App;
