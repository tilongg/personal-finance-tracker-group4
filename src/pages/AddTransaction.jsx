import { useState } from "react";
import { Link } from "react-router-dom";
import { useFinance } from "../contexts/FinanceContext";
import { incomeTags, tags } from "../data/sampleData";

export default function AddTransaction() {
  const { addTransaction } = useFinance();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState("food");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount greater than 0");
      return;
    }

    addTransaction({
      date,
      type,
      amount: Number(amount),
      tag,
      note
    });

    setMsg("Transaction added successfully!");
    setAmount("");
    setNote("");

    setTimeout(() => {
      setMsg("");
    }, 3000);
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Add Transaction</h1>
        <Link to="/transactions" className="btn-secondary">
          Back to List
        </Link>
      </div>

      <div style={{ maxWidth: "540px" }}>
        {msg && <div className="msg-success">{msg}</div>}

        <section className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                className="form-control"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Transaction Type</label>
              <select
                id="type"
                className="form-control"
                value={type}
                onChange={(event) => {
                  const newType = event.target.value;
                  setType(newType);
                  setTag(newType === "income" ? "salary" : "food");
                }}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                id="amount"
                type="number"
                step="any"
                min="0.01"
                placeholder="e.g. 50"
                className="form-control"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag">Category / Tag</label>
              <select
                id="tag"
                className="form-control"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
              >
                {type === "income" ? (
                  incomeTags.map((incomeTag) => (
                    <option key={incomeTag} value={incomeTag}>
                      {incomeTag}
                    </option>
                  ))
                ) : (
                  tags
                    .filter((t) => !incomeTags.includes(t))
                    .map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="note">Note</label>
              <textarea
                id="note"
                rows={3}
                placeholder="What was this for?"
                className="form-control"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px" }}>
              Save Transaction
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
