export interface ExpenseCardProps {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  onDelete?: (id: number) => void;
}

function ExpenseCard({ id, description, amount, category, date, onDelete }: ExpenseCardProps) {
  return (
    <div className="expense-card">
      <div className="expense-details">
        <h3>{description}</h3>
        <p className="category">{category}</p>
        <p className="date">{date}</p>
      </div>
      <div className="expense-amount">
        <span>${amount.toFixed(2)}</span>
        {onDelete && (
          <button onClick={() => onDelete(id)} className="delete-btn">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ExpenseCard;

