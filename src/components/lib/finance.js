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

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Number(amount));
}

export function getCategoryTotals(transactions) {
  const totals = new Map();

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const category = transaction.tag || "others";
    const previousAmount = totals.get(category) || 0;

    totals.set(
      category,
      previousAmount + Number(transaction.amount)
    );
  }

  return Array.from(totals, ([name, amount]) => ({
    name,
    amount
  })).sort((a, b) => b.amount - a.amount);
}

export function getMonthlyChartData(transactions, selectedMonth) {
  let months;

  if (selectedMonth) {
    const [year, month] = selectedMonth.split("-").map(Number);

    months = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(year, month - 1 - 5 + index, 1);

      return (
        `${date.getFullYear()}-` +
        String(date.getMonth() + 1).padStart(2, "0")
      );
    });
  } else {
    months = [
      ...new Set(
        transactions.map((transaction) => transaction.date.slice(0, 7))
      )
    ].sort();
  }

  return months.map((month) => {
    const monthlyTransactions = transactions.filter(
      (transaction) => transaction.date.startsWith(month)
    );

    const { totalIncome, totalExpense } =
      calculateFinanceTotals(monthlyTransactions);

    const [year, monthNumber] = month.split("-").map(Number);
    const date = new Date(year, monthNumber - 1, 1);

    return {
      month,
      label: date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit"
      }),
      income: totalIncome,
      expenses: totalExpense
    };
  });
}