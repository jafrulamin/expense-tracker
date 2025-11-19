import { useState } from 'react';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expenseData: Omit<Expense, 'id'>) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!description || !amount || !category || !date) {
      alert('Please fill in all fields');
      return;
    }

    onAddExpense({
      description,
      amount: Number(amount),
      category,
      date,
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('Food');
    setDate('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
        >
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-btn">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;
