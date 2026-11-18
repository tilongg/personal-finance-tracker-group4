import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="login-page">
      <section className="card login-card">
        <p className="brand">Finance Tracker</p>
        <h1 className="page-title">Login</h1>
        <p>The mock login form will be implemented in the next stage.</p>

        <Link className="btn-primary" to="/">
          Back to Dashboard
        </Link>

        <Link to="/about">About this app</Link>
      </section>
    </main>
  );
}