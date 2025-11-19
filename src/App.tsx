import { useState } from 'react';
import Header from './components/Header';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { Expense } from './types';
import './App.css';

// Initial sample expenses
const initialExpenses: Expense[] = [
  {
    id: 1,
    description: 'Grocery Shopping',
    amount: 52.30,
    category: 'Food',
    date: '2025-11-15',
  },
  {
    id: 2,
    description: 'Gas',
    amount: 45.00,
    category: 'Transportation',
    date: '2025-11-16',
  },
  {
    id: 3,
    description: 'Coffee',
    amount: 5.50,
    category: 'Food',
    date: '2025-11-18',
  },
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      id: Date.now(),
      ...expenseData,
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="app">
      <Header />
      <ExpenseSummary expenses={expenses} />
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
    </div>
  );
}

export default App;
