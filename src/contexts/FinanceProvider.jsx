import { useEffect, useState } from "react";
import { FinanceContext } from "./FinanceContext";
import { sampleTransactions, sampleGoals } from "../data/sampleData";
import { calculateFinanceTotals } from "../components/lib/finance";
import { loadStoredArray, saveStoredArray } from "../components/lib/storage";

export default function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() =>
    loadStoredArray("savedTransactions")
  );

  const [sampleTransactionsLoaded, setSampleTransactionsLoaded] = useState(() =>
    localStorage.getItem("sampleTxnsLoaded") === "true"
  );

  const [goals, setGoals] = useState(() => loadStoredArray("savedGoals"));

  useEffect(() => {
    saveStoredArray("savedTransactions", transactions);
  }, [transactions]);

  useEffect(() => {
    saveStoredArray("savedGoals", goals);
  }, [goals]);

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

  function addGoal(newGoal) {
    const goal = {
      ...newGoal,
      id: Date.now(),
      targetAmount: Number(newGoal.targetAmount),
      currentAmount: Number(newGoal.currentAmount || 0)
    };

    setGoals((previous) => [goal, ...previous]);
  }

  function updateGoal(id, updatedData) {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              ...updatedData,
              targetAmount: Number(updatedData.targetAmount),
              currentAmount: Number(updatedData.currentAmount || 0)
            }
          : goal
      )
    );
  }

  function addToGoal(id, amount) {
    setGoals((previous) =>
      previous.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              currentAmount: Math.max(
                0,
                Number(goal.currentAmount || 0) + Number(amount)
              )
            }
          : goal
      )
    );
  }

  function deleteGoal(id) {
    setGoals((previous) => previous.filter((goal) => goal.id !== id));
  }

  function loadSampleGoals() {
    setGoals((previous) => {
      const existingIds = new Set(previous.map((goal) => goal.id));
      const missingGoals = sampleGoals.filter(
        (sample) => !existingIds.has(sample.id)
      );

      return [...previous, ...missingGoals];
    });
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
        goals,
        addGoal,
        updateGoal,
        addToGoal,
        deleteGoal,
        loadSampleGoals,
        totalIncome,
        totalExpense,
        balance
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}