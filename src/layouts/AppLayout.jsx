import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <Navbar />
      </aside>

      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}