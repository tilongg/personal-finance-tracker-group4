import { useState } from "react";
import { Link } from "react-router-dom";
import { useFinance } from "../contexts/FinanceContext";

export default function AddTransaction() {
  const { addTransaction } = useFinance();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    addTransaction({
      date,
      type,
      amount: Number(amount),
      tag: category,
      note
    });

    setAmount("");
    setNote("");
  }

  return (
    <main>
      <h1>Add Transaction</h1>

      <Link to="/transactions">Back to Transactions</Link>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", marginTop: "20px" }}>
        <div>
          <label htmlFor="date">Date</label>
          <br />
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="type">Type</label>
          <br />
          <select
            id="type"
            value={type}
            onChange={(event) => {
              const newType = event.target.value;

              setType(newType);
              setCategory(newType === "income" ? "salary" : "food");
            }}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="amount">Amount</label>
          <br />
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="category">Category</label>
          <br />
          {type === "income" ? (
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="salary">Salary</option>
              <option value="interest">Interest</option>
              <option value="other income">Other Income</option>
            </select>
          ) : (
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="note">Note</label>
          <br />
          <textarea
            id="note"
            rows="3"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">Save Transaction</button>
      </form>
    </main>
  );
}