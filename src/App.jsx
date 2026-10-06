import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // Load saved expenses when the app opens
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // Save expenses every time the list changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function handleSubmit(e) {
    e.preventDefault();

    // Stop if a box is empty
    if (name.trim() === "" || amount === "") return;

    const newExpense = {
      id: Date.now(),
      name: name,
      amount: Number(amount),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  }

  // Remove one expense
  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  // Add all amounts together
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app">
      <h1>Expense Tracker</h1>

      <h2>Total: Rs {total}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (Rs)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {expenses.length === 0 && <p>No expenses yet. Add one above! 👆</p>}

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} — Rs {expense.amount}
            <button onClick={() => deleteExpense(expense.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;