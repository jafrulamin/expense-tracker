import { useState } from 'react';

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

interface ExpenseFormProps {
  onAddExpense: (expenseData: Omit<Expense, 'id'>) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
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
    setCategory('');
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
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Food, Transport"
        />
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

