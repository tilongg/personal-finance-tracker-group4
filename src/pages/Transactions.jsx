import { useState } from "react";
import { Link } from "react-router-dom";
import TransactionTable from "../components/transactions/TransactionTable";
import { useFinance } from "../contexts/FinanceContext";
import { calculateFilteredNet,filterAndSortTransactions } from "../components/lib/finance";
import { tags } from "../data/sampleData";

export default function Transactions() {
  const {
    transactions,
    deleteTransaction,
    loadSampleTransactions,
    sampleTransactionsLoaded
  } = useFinance();

  const [filters, setFilters] = useState({
    type: "",
    tag: "",
    month: "",
    sortBy: "date",
    sortOrder: "descending"
  });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + Number(transaction.amount || 0),
      0
    );

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + Number(transaction.amount || 0),
      0
    );

  const balance = totalIncome - totalExpense;
  const filteredTransactions = filterAndSortTransactions(transactions, filters);
  const filteredNet = calculateFilteredNet(filteredTransactions);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function handleDelete(id) {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(id);
    }
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>

        <div className="page-actions">
          {!sampleTransactionsLoaded && (
            <button
              type="button"
              className="btn-secondary"
              onClick={loadSampleTransactions}
            >
              Sample data
            </button>
          )}

          <Link to="/transactions/new" className="btn-primary">
            + Add transaction
          </Link>
        </div>
      </div>

      <div className="summary-boxes">
        <div className="summary-box">
          <div className="label">Total Income</div>
          <div className="amount text-income">
            ${totalIncome.toLocaleString()}
          </div>
        </div>

        <div className="summary-box">
          <div className="label">Total Expense</div>
          <div className="amount text-expense">
            ${totalExpense.toLocaleString()}
          </div>
        </div>

        <div className="summary-box">
          <div className="label">Net Balance</div>
          <div className={balance >= 0 ? "amount text-income" : "amount text-expense"}>
            ${balance.toLocaleString()}
          </div>
        </div>
      </div>

      <section className="card transaction-filters" aria-label="Filter transactions">
        <div className="filter-field">
          <label htmlFor="filter-type">Type</label>
          <select
            id="filter-type"
            name="type"
            className="form-control"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-tag">Category</label>
          <select
            id="filter-tag"
            name="tag"
            className="form-control"
            value={filters.tag}
            onChange={handleFilterChange}
          >
            <option value="">All categories</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="filter-month">Month</label>
          <input
            id="filter-month"
            name="month"
            type="month"
            className="form-control"
            value={filters.month}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-field">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            name="sortBy"
            className="form-control"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="sort-order">Order</label>
          <select
            id="sort-order"
            name="sortOrder"
            className="form-control"
            value={filters.sortOrder}
            onChange={handleFilterChange}
          >
            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </section>

      <TransactionTable
        transactions={filteredTransactions} 
        filteredNet={filteredNet}
        onDelete={handleDelete}
      />
    </>
  );
}