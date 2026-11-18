import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import SavingsGoals from "./pages/SavingsGoals.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path="about" element={<About />} />

        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/new" element={<AddTransaction />} />
          <Route path="savings" element={<SavingsGoals />} />
        </Route>

        <Route
          path="*"
          element={<h1 className="page-title">Page not found</h1>}
        />
      </Route>
    </Routes>
  );
}