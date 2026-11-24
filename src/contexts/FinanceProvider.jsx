import { useEffect, useState } from "react";
import { FinanceContext } from "./FinanceContext";
import { sampleTransactions } from "../data/sampleData";
import { calculateFinanceTotals } from "../components/lib/finance";
import { loadStoredArray, saveStoredArray } from "../components/lib/storage";

export default function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() =>
    loadStoredArray("savedTransactions")
  );

  const [sampleTransactionsLoaded, setSampleTransactionsLoaded] = useState(() =>
    localStorage.getItem("sampleTxnsLoaded") === "true"
  );

  useEffect(() => {
    saveStoredArray("savedTransactions", transactions);
  }, [transactions]);

  function addTransaction(newTransaction) {
    const transaction = {
      ...newTransaction,
      id: Date.now(),
      amount: Number(newTransaction.amount)
    };

    setTransactions((previous) => [
      transaction,
      ...previous
    ]);
  }

  function deleteTransaction(id) {
    const nextTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(nextTransactions);

    if (nextTransactions.length === 0 && sampleTransactionsLoaded) {
      setSampleTransactionsLoaded(false);
      localStorage.removeItem("sampleTxnsLoaded");
    }
  }

  function updateTransaction(id, updatedData) {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              ...updatedData,
              amount: Number(updatedData.amount)
            }
          : transaction
      )
    );
  }

  function loadSampleTransactions() {
    if (sampleTransactionsLoaded) return;

    setTransactions((previous) => {
      const existingIds = new Set(previous.map((transaction) => transaction.id));
      const missingTransactions = sampleTransactions.filter(
        (sample) => !existingIds.has(sample.id)
      );

      return [...previous, ...missingTransactions];
    });

    setSampleTransactionsLoaded(true);
    localStorage.setItem("sampleTxnsLoaded", "true");
  }

  const { totalIncome, totalExpense, balance } =
    calculateFinanceTotals(transactions);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        sampleTransactionsLoaded,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        loadSampleTransactions,
        totalIncome,
        totalExpense,
        balance
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}