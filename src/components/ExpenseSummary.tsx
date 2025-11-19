import { Expense } from '../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-summary">
      <div className="summary-item">
        <span className="summary-label">Total Expenses:</span>
        <span className="summary-value">{expenses.length}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Total Amount:</span>
        <span className="summary-value">${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default ExpenseSummary;
