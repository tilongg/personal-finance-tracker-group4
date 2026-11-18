import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <NavLink to="/" end>
        Dashboard
      </NavLink>

      <NavLink to="/transactions" end>
        Transactions
      </NavLink>

      <NavLink to="/transactions/new">
        Add Transaction
      </NavLink>

      <NavLink to="/savings">
        Savings Goals
      </NavLink>

      <NavLink to="/about">
        About
      </NavLink>

      <NavLink to="/login">
        Login
      </NavLink>
    </nav>
  );
}