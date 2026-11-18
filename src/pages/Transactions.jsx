import { Link } from "react-router-dom";

export default function Transactions() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>

        <Link className="btn-primary" to="/transactions/new">
          Add Transaction
        </Link>
      </div>

      <section className="card">
        <h2>Transaction History</h2>
        <p>Your transactions and filters will appear here.</p>
      </section>
    </>
  );
}