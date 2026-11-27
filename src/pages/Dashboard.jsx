import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFinance } from "../contexts/FinanceContext";
import {
  calculateFinanceTotals,
  filterAndSortTransactions,
  formatCurrency,
  getCategoryTotals,
  getMonthlyChartData
} from "../components/lib/finance";
import SummaryCards from "../components/dashboard/SummaryCards";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import SpendingCategoryChart from "../components/dashboard/SpendingCategoryChart";
import SavingsOverview from "../components/dashboard/SavingsOverview";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { transactions, goals } = useFinance();

const [selectedMonth, setSelectedMonth] = useState(() => {
  const savedPeriod = sessionStorage.getItem("dashboardPeriod");

  // An empty string is the saved "All time" option.
  if (savedPeriod !== null) {
    return savedPeriod;
  }

  const today = new Date();

  return (
    `${today.getFullYear()}-` +
    String(today.getMonth() + 1).padStart(2, "0")
  );
});

useEffect(() => {
  sessionStorage.setItem("dashboardPeriod", selectedMonth);
}, [selectedMonth]);

  const today = new Date();
  const currentMonth =
    `${today.getFullYear()}-` +
    String(today.getMonth() + 1).padStart(2, "0");

  const availableMonths = [
    ...new Set([
      currentMonth,
      selectedMonth,
      ...transactions.map((transaction) => transaction.date.slice(0, 7))
    ])
  ]
    .filter(Boolean)
    .sort()
    .reverse();

  const periodTransactions = filterAndSortTransactions(transactions, {
    month: selectedMonth,
    sortBy: "date",
    sortOrder: "descending"
  });

  const totals = calculateFinanceTotals(periodTransactions);
  const categoryData = getCategoryTotals(periodTransactions);
  const monthlyData = getMonthlyChartData(transactions, selectedMonth);
  const recentTransactions = periodTransactions.slice(0, 5);

  function formatMonth(month) {
    const [year, monthNumber] = month.split("-").map(Number);

    return new Date(year, monthNumber - 1, 1).toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric"
      }
    );
  }

  return (
    <div className="dashboard">
      <header className="page-header dashboard-header">
        <h1 className="page-title">Dashboard</h1>

        <div className="dashboard-actions">
          <div className="dashboard-period">
            <label htmlFor="dashboard-month">Period</label>

            <select
              id="dashboard-month"
              className="form-control"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
            >
              <option value="">All time</option>

              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {formatMonth(month)}
                </option>
              ))}
            </select>
          </div>

          <Link className="btn-primary" to="/transactions/new">
            + Add Transaction
          </Link>
        </div>
      </header>

            <SummaryCards totals={totals} />

      <div className="dashboard-columns">
        <div className="dashboard-column dashboard-left">
          <IncomeExpenseChart
            data={monthlyData}
            selectedMonth={selectedMonth}
          />

          <section className="card dashboard-panel dashboard-recent">
            <div className="dashboard-section-header">
              <h2>Recent Transactions</h2>
              <Link to="/transactions">View All</Link>
            </div>

            {recentTransactions.length > 0 ? (
              <ul className="dashboard-transaction-list">
                {recentTransactions.map((transaction) => {
                  const isIncome = transaction.type === "income";

                  return (
                    <li key={transaction.id}>
                      <div className="dashboard-transaction-description">
                        <strong>
                          {transaction.note || transaction.tag}
                        </strong>
                        <span>{transaction.tag}</span>
                      </div>

                      <time dateTime={transaction.date}>
                        {new Date(
                          `${transaction.date}T00:00:00`
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </time>

                      <strong
                        className={
                          isIncome ? "text-income" : "text-expense"
                        }
                      >
                        {isIncome ? "+" : "−"}
                        {formatCurrency(transaction.amount)}
                      </strong>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="dashboard-empty">
                <p>No transactions for this period.</p>
                <Link to="/transactions/new">Add a transaction</Link>
              </div>
            )}
          </section>
        </div>

        <div className="dashboard-column dashboard-right">
          <SpendingCategoryChart
            data={categoryData}
            totalExpense={totals.totalExpense}
          />

          <SavingsOverview goals={goals} />
        </div>
      </div>
    </div>
  );
}