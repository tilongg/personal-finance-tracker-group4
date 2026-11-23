import { useState } from "react";
import { FinanceContext } from "./FinanceContext";
import { sampleTransactions } from "../data/SampleData";

export default function FinanceProvider({ children }) {
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
  const [sampleTransactionsLoaded, setSampleTransactionsLoaded] = useState(false);

  function loadSampleTransactions() {
    if (sampleTransactionsLoaded) return;

    setTransactions((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const toAdd = sampleTransactions.filter((s) => !existingIds.has(s.id));
      return [...prev, ...toAdd];
    });

    setSampleTransactionsLoaded(true);
  }

  function addTransaction(newTransaction) {
    setTransactions((previous) => [
      {
        ...newTransaction,
        id: Date.now(),
        amount: Number(newTransaction.amount)
      },
      ...previous
    ]);
  }

  function deleteTransaction(id) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        loadSampleTransactions,
        sampleTransactionsLoaded
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}