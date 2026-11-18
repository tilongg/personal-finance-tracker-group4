import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/login", { replace: true });
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeMenu();
      event.currentTarget
        .querySelector(".menu-toggle")
        ?.focus();
    }
  }

  return (
    <div className="navbar" onKeyDown={handleKeyDown}>
      <div className="navbar-top">
        <p className="brand">Finance Tracker</p>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        id="main-navigation"
        className={`menu-panel ${isOpen ? "is-open" : ""}`}
      >
        <div className="menu-inner">
          <nav className="navigation" aria-label="Main navigation">
            {isLoggedIn && (
              <>
                <NavLink to="/" end onClick={closeMenu}>
                  Dashboard
                </NavLink>

                <NavLink to="/transactions" end onClick={closeMenu}>
                  Transactions
                </NavLink>

                <NavLink to="/transactions/new" onClick={closeMenu}>
                  Add Transaction
                </NavLink>

                <NavLink to="/savings" onClick={closeMenu}>
                  Savings Goals
                </NavLink>
              </>
            )}

            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>

            {isLoggedIn ? (
              <button
                className="logout-button"
                type="button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <NavLink to="/login" onClick={closeMenu}>
                Log In
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}