// Simple sample transactions for testing
export const sampleTransactions = [
  {
    id: 1,
    date: "2026-04-03",
    type: "income",
    amount: 5000,
    tag: "salary",
    note: "Monthly salary"
  },
  {
    id: 2,
    date: "2026-04-05",
    type: "expense",
    amount: 1200,
    tag: "rent",
    note: "Apartment rent"
  },
  {
    id: 3,
    date: "2026-04-08",
    type: "expense",
    amount: 150,
    tag: "food",
    note: "Weekly groceries"
  },
  {
    id: 4,
    date: "2026-04-12",
    type: "income",
    amount: 200,
    tag: "interest",
    note: "Bank interest"
  },
  {
    id: 5,
    date: "2026-04-15",
    type: "expense",
    amount: 80,
    tag: "entertainment",
    note: "Cinema and snacks"
  },
  {
    id: 6,
    date: "2026-04-20",
    type: "expense",
    amount: 60,
    tag: "health",
    note: "Pharmacy medicine"
  }
];

export const sampleGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    targetAmount: 3000,
    currentAmount: 1800,
    deadline:"2026-12-22"
  },
  {
    id: 2,
    title: "New Laptop",
    targetAmount: 1200,
    currentAmount: 850,
    deadline:"2026-12-22"
  }
];

export const tags = [
  "salary",
  "interest",
  "other income",
  "food",
  "rent",
  "clothes",
  "entertainment",
  "health",
  "transport",
  "bills",
  "others"
];
