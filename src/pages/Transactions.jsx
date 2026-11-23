import { useState } from "react";
import TransactionTable from "../components/TransactionTable";

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2026-04-03",
      type: "income",
      tag: "salary",
      note: "Monthly salary",
      amount: 5000
    },
    {
      id: 2,
      date: "2026-04-05",
      type: "expense",
      tag: "rent",
      note: "Apartment rent",
      amount: 1200
    },
    {
      id: 3,
      date: "2026-04-08",
      type: "expense",
      tag: "food",
      note: "Weekly groceries",
      amount: 150
    }
  ]);

  function handleDelete(id) {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
      </div>

      <TransactionTable
        transactions={transactions}
        filteredNet={0}
        onEdit={() => {}}
        onDelete={handleDelete}
      />
    </div>
  );
}