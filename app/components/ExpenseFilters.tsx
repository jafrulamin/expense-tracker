import type { ExpenseCategory } from '../types';

interface ExpenseFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ExpenseFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ExpenseFiltersProps) {
  const categories: (ExpenseCategory | 'All')[] = ['All', 'Food', 'Transportation', 'Entertainment', 'Other'];

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-slate-50 rounded-md p-3">
      <div className="flex-1">
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">
          Sort by
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="amount-desc">Amount (Highest First)</option>
          <option value="amount-asc">Amount (Lowest First)</option>
        </select>
      </div>
    </div>
  );
}

