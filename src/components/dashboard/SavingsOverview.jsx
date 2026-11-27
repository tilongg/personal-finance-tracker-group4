import { Link } from "react-router-dom";
import {
  calculateGoalProgress,
  formatCurrency
} from "../lib/finance";

export default function SavingsOverview({ goals }) {
  const unfinishedGoals = goals.filter(
    (goal) =>
      Number(goal.currentAmount || 0) < Number(goal.targetAmount)
  );

  const visibleGoals = unfinishedGoals.slice(0, 3);

  return (
    <section className="card dashboard-panel">
      <div className="dashboard-section-header">
        <h2>Savings Goals</h2>
        <Link to="/savings">View Goals</Link>
      </div>

      <p className="dashboard-caption">Current progress across all dates</p>

      {visibleGoals.length > 0 ? (
        <ul className="dashboard-goal-list">
          {visibleGoals.map((goal) => {
            const progress = calculateGoalProgress(goal);

            return (
              <li key={goal.id}>
                <h3>{goal.title}</h3>

                <div className="dashboard-goal-details">
                  <span>
                    {formatCurrency(goal.currentAmount || 0)}
                    {" / "}
                    {formatCurrency(goal.targetAmount)}
                  </span>
                  <strong>{progress}%</strong>
                </div>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label={goal.title}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="dashboard-empty">
          {goals.length === 0
            ? "Create a savings goal to start tracking your progress."
            : "You have reached all your savings goals!"}
        </p>
      )}
    </section>
  );
}