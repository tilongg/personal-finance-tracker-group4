import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <p className="brand">Finance Tracker</p>
        <Navbar />
      </aside>

      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}