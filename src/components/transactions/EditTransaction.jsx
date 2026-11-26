import { tags } from "../../data/sampleData";

const incomeTags = ["salary", "interest", "other income"];

export default function EditTransactionModal({ transaction, onChange, onClose, onSave }) {
  if (!transaction) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(transaction.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      window.alert("Please enter a valid amount greater than 0");
      return;
    }
    onSave();
  }

  function updateField(field, value) {
    const updatedTransaction = { ...transaction, [field]: value };
    if (field === "type") {
      updatedTransaction.tag = value === "income" ? "salary" : "food";
    }
    onChange(updatedTransaction);
  }

  return (
    <div className="simple-modal-backdrop" onClick={onClose}>
      <div
        className="simple-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-transaction-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="page-header">
          <h2 id="edit-transaction-title">Edit transaction</h2>
          <button type="button" className="close-btn" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-date">Date</label>
            <input
              id="edit-date"
              type="date"
              className="form-control"
              value={transaction.date}
              onChange={(event) => updateField("date", event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-type">Type</label>
            <select
              id="edit-type"
              className="form-control"
              value={transaction.type}
              onChange={(event) => updateField("type", event.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-amount">Amount ($)</label>
            <input
              id="edit-amount"
              type="number"
              step="any"
              min="0.01"
              className="form-control"
              value={transaction.amount}
              onChange={(event) => updateField("amount", event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-tag">Category</label>
            <select
              id="edit-tag"
              className="form-control"
              value={transaction.tag}
              onChange={(event) => updateField("tag", event.target.value)}
            >
              {(transaction.type === "income"
                ? incomeTags
                : tags.filter((tag) => !incomeTags.includes(tag))
              ).map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="edit-note">Note</label>
            <input
              id="edit-note"
              type="text"
              className="form-control"
              value={transaction.note}
              onChange={(event) => updateField("note", event.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
