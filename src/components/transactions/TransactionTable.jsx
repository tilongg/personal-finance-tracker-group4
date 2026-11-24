export default function TransactionTable({
  transactions,
  filteredNet,
  onEdit,
  onDelete
}) {
  if (transactions.length === 0) {
    return (
      <section className="card table-card">
        <p>No transactions found.</p>
      </section>
    );
  }

  return (
    <section className="card table-card">
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
              <td>{index + 1}</td>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.tag}</td>
              <td>{transaction.note || "-"}</td>
              <td className="align-right">
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
      </table>
    </section>
  );
}