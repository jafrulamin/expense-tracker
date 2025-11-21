import { auth } from "@/auth/config";
import { getExpensesForUser } from "@/app/lib/expenses";
import AuthGate from "./components/AuthGate";
import ExpenseApp from "./components/ExpenseApp";

export default async function Page() {
  const session = await auth();

  let initialExpenses = [];
  if (session?.user?.email) {
    initialExpenses = await getExpensesForUser(session.user.email);
  }

  return (
    <AuthGate>
      <ExpenseApp initialExpenses={initialExpenses} />
    </AuthGate>
  );
}
