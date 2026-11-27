import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCurrency } from "../lib/finance";

export default function IncomeExpenseChart({ data, selectedMonth }) {
  const hasTransactions = data.some(
    (month) => month.income > 0 || month.expenses > 0
  );

  return (
    <section className="card dashboard-panel">
      <h2>Income vs Expenses</h2>
      <p className="dashboard-caption">
        {selectedMonth
          ? "Six months ending in the selected month"
          : "All recorded months"}
      </p>

      {hasTransactions ? (
        <div className="dashboard-chart">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart
              data={data}
              margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
              accessibilityLayer
            >
              <CartesianGrid
                stroke="var(--color-border)"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                minTickGap={12}
              />

              <YAxis
                width={60}
                tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-text)"
                }}
                labelStyle={{ color: "var(--color-text)" }}
                cursor={{ fill: "var(--color-control)", opacity: 0.3 }}
              />

              <Legend />

              <Bar
                dataKey="income"
                name="Income"
                fill="var(--color-income)"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
                isAnimationActive={false}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="var(--color-expense)"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="dashboard-empty">
          No transactions in this chart period.
        </p>
      )}
    </section>
  );
}