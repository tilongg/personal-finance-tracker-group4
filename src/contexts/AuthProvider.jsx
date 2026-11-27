import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("financeLoggedIn") === "true"
  );

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem("financeLoggedIn", "true");
    } else {
      sessionStorage.removeItem("financeLoggedIn");
    }
  }, [isLoggedIn]);

  function login(email, password) {
    const valid =
      email.trim().toLowerCase() === "admin@demo.com" &&
      password === "demo123";

    if (valid) {
      sessionStorage.removeItem("dashboardPeriod");
      setIsLoggedIn(true);
    }

    return valid;
  }

  function logout() {
      sessionStorage.removeItem("dashboardPeriod");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}