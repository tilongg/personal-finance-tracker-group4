import { useFinance } from "../contexts/FinanceContext";
import TransactionTable from "../components/transactions/TransactionTable";

export default function Transactions() {
  const { transactions, deleteTransaction } = useFinance();

  function handleDelete(id) {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(id);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
      </div>

      <TransactionTable
        transactions={transactions}
        filteredNet={0}
        onEdit={() => {}}
        onDelete={handleDelete}
      />
    </div>
  );
}