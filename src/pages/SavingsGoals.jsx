import { useState } from "react";
import { useFinance } from "../contexts/FinanceContext";
import {
  calculateGoalProgress,
  calculateGoalTotals
} from "../components/lib/finance";

export default function SavingsGoals() {
  const { goals, addGoal, updateGoal, addToGoal, deleteGoal, loadSampleGoals } =
    useFinance();

  // form state dis is used for both adding and editing goals
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [msg, setMsg] = useState("");

  // amount typed into each da goals like "Add money" input field
  const [contributions, setContributions] = useState({});

  // math happens in finance.js so this is dum
  const { totalTarget, totalSaved, completedCount } =
    calculateGoalTotals(goals);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setTargetAmount("");
    setCurrentAmount("");
    setDeadline("");
  }
  
  // shows the success message, then it disappears after 3 seconds just like dad goin for da milk
  function showMessage(text) {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  }

   // without this, the page refreshes and forgets everything soooooo is kinda important if u wanna rembr ur goals
  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a goal name");
      return;
    }

    if (!targetAmount || Number(targetAmount) <= 0) {
      alert("Target amount must be greater than 0");
      return;
    }
    // you can't save negative money, thats called debt
    if (currentAmount && Number(currentAmount) < 0) {
      alert("Saved amount cannot be negative");
      return;
    }

    const goalData = {
      title: title.trim(),
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount || 0),
      deadline
    };

    if (editingId) {
      updateGoal(editingId, goalData);
      showMessage("Goal updated!");
    } else {
      addGoal(goalData);
      showMessage("Goal added!");
    }

    resetForm();
  }

  function handleEdit(goal) {
    setEditingId(goal.id);
    setTitle(goal.title);
    setTargetAmount(String(goal.targetAmount));
    setCurrentAmount(String(goal.currentAmount));
    setDeadline(goal.deadline || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // "are you sure?" because deleting a goal is basically giving up ;)
  function handleDelete(goal) {
    if (window.confirm(`Delete the goal "${goal.title}"?`)) {
      deleteGoal(goal.id);
      if (editingId === goal.id) resetForm();
    }
  }

  function handleContribute(event, goal) {
    event.preventDefault();

    const amount = Number(contributions[goal.id]);

    if (!amount || amount <= 0) {
      alert("Please enter an amount greater than 0");
      return;
    }

    addToGoal(goal.id, amount);
    setContributions((previous) => ({ ...previous, [goal.id]: "" }));
  }

  function getDeadlineText(goal) {
    if (!goal.deadline) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil(
      (new Date(goal.deadline) - today) / (1000 * 60 * 60 * 24)
    );

    if (Number(goal.currentAmount) >= Number(goal.targetAmount)) {
      return `Target date: ${goal.deadline}`;
    }
    if (daysLeft < 0) return `Overdue (was ${goal.deadline})`;
    if (daysLeft === 0) return "Due today";
    return `${daysLeft} day${daysLeft === 1 ? "" : "s"} left (${goal.deadline})`;
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Savings Goals</h1>

        {goals.length === 0 && (
          <button
            type="button"
            className="btn-secondary"
            onClick={loadSampleGoals}
          >
            Sample data
          </button>
        )}
      </div>

      {msg && <div className="msg-success">{msg}</div>}

      <div className="summary-boxes">
        <div className="summary-box">
          <div className="label">Total Saved</div>
          <div className="amount text-income">
            ${totalSaved.toLocaleString()}
          </div>
        </div>

        <div className="summary-box">
          <div className="label">Total Target</div>
          <div className="amount">${totalTarget.toLocaleString()}</div>
        </div>

        <div className="summary-box">
          <div className="label">Goals Completed</div>
          <div className="amount">
            {completedCount} / {goals.length}
          </div>
        </div>
      </div>

      <div className="goals-layout">
        <section className="card goal-form-card">
          <h2>{editingId ? "Edit Goal" : "New Goal"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="goal-title">Goal name</label>
              <input
                id="goal-title"
                type="text"
                className="form-control"
                placeholder="e.g. New Laptop"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal-target">Target amount ($)</label>
              <input
                id="goal-target"
                type="number"
                step="any"
                min="0.01"
                placeholder="e.g. 1200"
                className="form-control"
                value={targetAmount}
                onChange={(event) => setTargetAmount(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal-current">Already saved ($)</label>
              <input
                id="goal-current"
                type="number"
                step="any"
                min="0"
                placeholder="0"
                className="form-control"
                value={currentAmount}
                onChange={(event) => setCurrentAmount(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal-deadline">Target date (optional)</label>
              <input
                id="goal-deadline"
                type="date"
                className="form-control"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
              />
            </div>

            <div className="goal-form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Save Changes" : "Add Goal"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <div className="goal-list">
          {goals.length === 0 ? (
            <section className="card">
              <h2>Your Goals</h2>
              <p>
                You don&apos;t have any savings goals yet. Add one using the
                form to start tracking your progress.
              </p>
            </section>
          ) : (
            goals.map((goal) => {
              const progress = calculateGoalProgress(goal);
              const saved = Number(goal.currentAmount || 0);
              const target = Number(goal.targetAmount);
              const remaining = Math.max(0, target - saved);
              const isComplete = saved >= target;
              const deadlineText = getDeadlineText(goal);

              return (
                <section className="card goal-card" key={goal.id}>
                  <div className="goal-card-header">
                    <h2>{goal.title}</h2>
                    {isComplete && (
                      <span className="goal-badge">Goal reached!</span>
                    )}
                  </div>

                  <div className="goal-amounts">
                    <span className="goal-saved">
                      ${saved.toLocaleString()}
                    </span>
                    <span className="muted-text">
                      of ${target.toLocaleString()}
                    </span>
                  </div>

                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-label={`${goal.title} progress`}
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`progress-fill ${isComplete ? "complete" : ""}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="goal-meta">
                    <span>{progress}% saved</span>
                    <span>
                      {/* yay u reached ur goal, what a good job, now u can buy urself a new laptop or whatever it is u were saving for */}
                      {saved > target
                        ? `$${(saved - target).toLocaleString()} over target`
                        : isComplete
                        ? "Fully funded"
                        : `$${remaining.toLocaleString()} to go`}
                    </span>
                  </div>

                  {deadlineText && (
                    <p className="goal-deadline">{deadlineText}</p>
                  )}

                  <form
                    className="goal-contribute"
                    onSubmit={(event) => handleContribute(event, goal)}
                  >
                    <input
                      type="number"
                      step="any"
                      min="0.01"
                      placeholder="Add money ($)"
                      aria-label={`Amount to add to ${goal.title}`}
                      className="form-control"
                      value={contributions[goal.id] || ""}
                      onChange={(event) =>
                        setContributions((previous) => ({
                          ...previous,
                          [goal.id]: event.target.value
                        }))
                      }
                    />
                    <button type="submit" className="btn-primary">
                      Add
                    </button>
                  </form>

                  <div className="goal-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleEdit(goal)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-secondary btn-danger"
                      onClick={() => handleDelete(goal)}
                    >
                      Delete
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}