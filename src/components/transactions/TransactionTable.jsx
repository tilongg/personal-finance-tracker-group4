function TransactionRow({ transaction, index, onDelete }) {
  const isIncome = transaction.type === "income";

  return (
    <tr>
      <td className="muted-text">{index + 1}</td>
      <td>{transaction.date}</td>
      <td>
        <span className={isIncome ? "text-income" : "text-expense"}>
          {transaction.type}
        </span>
      </td>
      <td>
        <span className="tag">{transaction.tag}</span>
        </td>
      <td>{transaction.note || "-"}</td>
      <td className={`align-right amount-cell ${transaction.type}`}>
        {isIncome ? "+" : "-"}$
        {Number(transaction.amount).toLocaleString()}
      </td>
      <td className="align-center">
        <button
          type="button"
          className="btn-delete btn-sm"
          onClick={() => onDelete(transaction.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function TransactionTable({ transactions, filteredNet, onDelete }) {
  if (transactions.length === 0) {
    return (
      <section className="card table-card">
        <p>No transactions found.</p>
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
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                index={index}
                onDelete={onDelete}
              />
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={5} className="align-right">
                Total balance
              </td>
              <td className={`align-right ${filteredNet >= 0 ? "text-income" : "text-expense"}`}>
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