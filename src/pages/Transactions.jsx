import { Link } from "react-router-dom";
import TransactionTable from "../components/transactions/TransactionTable";
import { useFinance } from "../contexts/FinanceContext";

export default function Transactions() {
  const {
    transactions,
    deleteTransaction,
    loadSampleTransactions,
    sampleTransactionsLoaded
  } = useFinance();

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

      <TransactionTable
        transactions={transactions}
        balance={balance}
        onDelete={handleDelete}
      />
    </>
  );
}