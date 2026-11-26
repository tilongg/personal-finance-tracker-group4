import { formatCurrency } from "../lib/finance";

export default function SummaryCards({ totals }) {
  const cards = [
    {
      title: "Income",
      amount: totals.totalIncome,
      symbol: "↗",
      className: "dashboard-income"
    },
    {
      title: "Expenses",
      amount: totals.totalExpense,
      symbol: "↘",
      className: "dashboard-expense"
    },
    {
      title: "Net Balance",
      amount: totals.balance,
      symbol: "$",
      className:
        totals.balance < 0
          ? "dashboard-expense"
          : "dashboard-balance"
    }
  ];

  return (
    <div className="dashboard-summary">
      {cards.map((card) => (
        <section
          className={`card dashboard-summary-card ${card.className}`}
          key={card.title}
        >
          <span className="dashboard-summary-icon" aria-hidden="true">
            {card.symbol}
          </span>

          <div>
            <h2>{card.title}</h2>
            <strong>{formatCurrency(card.amount)}</strong>
          </div>
        </section>
      ))}
    </div>
  );
}