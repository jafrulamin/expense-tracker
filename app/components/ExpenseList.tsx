import ExpenseCard from './ExpenseCard';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete?: (id: number) => void;
  showHighlight?: boolean;
}

export default function ExpenseList({ expenses, onDelete, showHighlight = true }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="text-center text-gray-500 py-8">No expenses found</p>;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 mb-2">
        Showing {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
      </p>
      {expenses.map((expense, index) => (
        <ExpenseCard
          key={expense.id}
          id={expense.id}
          description={expense.description}
          amount={expense.amount}
          category={expense.category}
          date={expense.date}
          receiptUrl={expense.receiptUrl}
          onDelete={onDelete}
          highlighted={showHighlight && index === 0}
        />
      ))}
    </div>
  );
}

