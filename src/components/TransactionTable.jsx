export default function TransactionTable({
  transactions,
  filteredNet,
  onDelete
}) {
  if (transactions.length === 0) {
    return (
      <section className="card table-card">
        <div className="empty-state">
          <p>No transactions found.</p>
        </div>
      </section>
    );
  }

  return (
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
              <th className="align-center">Actions</th>
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
                  <span className="tag">{transaction.tag}</span>
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
                    onClick={() => onDelete(transaction.id)}
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
                Filtered net
              </td>
              <td
                className={`align-right ${
                  filteredNet >= 0
                    ? "text-income"
                    : "text-expense"
                }`}
              >
                ${filteredNet.toLocaleString()}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}