import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { formatCurrency } from "../lib/finance";

const categoryColors = [
  "var(--color-primary)",
  "var(--color-chart-purple)",
  "var(--color-chart-blue)",
  "var(--color-expense)",
  "var(--color-income)",
  "#B8E1E8",
  "#F4BC62",
  "#E68BC4",
  "#7F9DB5",
  "#B1A3F5"
];

export default function SpendingCategoryChart({ data, totalExpense }) {
  const chartData = data.map((category, index) => ({
    ...category,
    fill: categoryColors[index % categoryColors.length]
  }));

  return (
    <section className="card dashboard-panel">
      <h2>Spending by Category</h2>

      {totalExpense > 0 ? (
        <>
          <div className="dashboard-donut">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart accessibilityLayer>
                <Pie
                  data={chartData}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={3}
                  stroke="none"
                  isAnimationActive={false}
                />

                <Tooltip
                  wrapperStyle={{ zIndex: 10 }}
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    color: "var(--color-text)"
                  }}
                  itemStyle={{ color: "var(--color-text)" }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="dashboard-donut-center">
              <strong>{formatCurrency(totalExpense)}</strong>
              <span>Total expenses</span>
            </div>
          </div>

          <ul className="dashboard-category-list">
            {chartData.map((category) => (
              <li key={category.name}>
                <span
                  className="dashboard-category-dot"
                  style={{ background: category.fill }}
                  aria-hidden="true"
                />

                <span className="dashboard-category-name">
                  {category.name}
                </span>

                <div className="dashboard-category-value">
                  <strong>{formatCurrency(category.amount)}</strong>
                  <span>
                    {((category.amount / totalExpense) * 100).toFixed(1)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="dashboard-empty">
          No expenses for this period.
        </p>
      )}
    </section>
  );
}