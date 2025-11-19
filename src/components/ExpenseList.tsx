import ExpenseCard from './ExpenseCard';

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
};

interface ExpenseListProps {
  expenses: Expense[];
  onDelete?: (id: number) => void;
}

function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="no-expenses">No expenses yet</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          id={expense.id}
          description={expense.description}
          amount={expense.amount}
          category={expense.category}
          date={expense.date}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ExpenseList;

