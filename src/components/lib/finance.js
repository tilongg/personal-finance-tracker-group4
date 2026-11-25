export function calculateFinanceTotals(transactions) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense
  };
}

export function filterAndSortTransactions(
  transactions,
  { type = "", tag = "", month = "", sortBy = "date", sortOrder = "descending" }
) {
  const filtered = transactions.filter((transaction) => {
    if (type && transaction.type !== type) return false;
    if (tag && transaction.tag !== tag) return false;
    if (month && (!transaction.date || !transaction.date.startsWith(month))) return false;
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === "amount") {
      const result = Number(a.amount) - Number(b.amount);
      return sortOrder === "ascending" ? result : -result;
    }

    const result = new Date(a.date) - new Date(b.date);
    return sortOrder === "ascending" ? result : -result;
  });
}

export function calculateFilteredNet(transactions) {
  return transactions.reduce((total, transaction) => {
    const amount = Number(transaction.amount);
    return transaction.type === "income" ? total + amount : total - amount;
  }, 0);

//da saving goalssssss lesgooooooo
}
export function calculateGoalProgress(goal) {
  const target = Number(goal.targetAmount);
  const current = Number(goal.currentAmount || 0);

  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

export function calculateGoalTotals(goals) {
  const totalTarget = goals.reduce(
    (total, goal) => total + Number(goal.targetAmount || 0),
    0
  );

  const totalSaved = goals.reduce(
    (total, goal) => total + Number(goal.currentAmount || 0),
    0
  );

  const completedCount = goals.filter(
    (goal) => Number(goal.currentAmount) >= Number(goal.targetAmount)
  ).length;

  return { totalTarget, totalSaved, completedCount };
}