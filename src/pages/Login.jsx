import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { isLoggedIn, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!login(email, password)) {
      setError("Incorrect email or password.");
    }
  }

  return (
    <main className="login-page">
      <section className="card login-card">
        <p className="brand">Finance Tracker</p>
        <h1 className="page-title">Welcome back</h1>
        <p>Log in to manage your finances.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="btn-primary" type="submit">
            Log In
          </button>
        </form>

        <div className="demo-credentials">
          <p>Demo account</p>
          <p>Email — admin@demo.com</p>
          <p>Password — demo123</p>
        </div>

        <Link to="/about">About this app</Link>
      </section>
    </main>
  );
}