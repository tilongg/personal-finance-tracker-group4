import { Link } from "react-router-dom";
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
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
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

          <Link
            to="/transactions/new"
            className="btn-primary"
          >
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
          <div
            className={
              balance >= 0
                ? "amount text-income"
                : "amount text-expense"
            }
          >
            ${balance.toLocaleString()}
          </div>
        </div>
      </div>

      {transactions.length === 0 ? (
        <section className="card table-card">
          <p>No transactions found.</p>
        </section>
      ) : (
        <section className="card table-card">
          <div className="table-wrapper">
            <table className="simple-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Note</th>
                  <th className="align-right">Amount</th>
                  <th className="align-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td className="muted-text">{index + 1}</td>
                    <td>{transaction.date}</td>

                    <td>
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-income"
                            : "text-expense"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td>
                      <span className="tag">
                        {transaction.tag}
                      </span>
                    </td>

                    <td>{transaction.note || "-"}</td>

                    <td
                      className={`align-right amount-cell ${transaction.type}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      ${Number(transaction.amount).toLocaleString()}
                    </td>

                    <td className="align-center">
                      <button
                        type="button"
                        className="btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(transaction.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={5} className="align-right">
                    Total balance
                  </td>
                  <td
                    className={`align-right ${
                      balance >= 0
                        ? "text-income"
                        : "text-expense"
                    }`}
                  >
                    ${balance.toLocaleString()}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      )}
    </>
  );
}