import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";
import { updateExpenseForUser, deleteExpenseForUser } from "@/app/lib/expenses";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const expenseId = Number(id);
  if (Number.isNaN(expenseId)) {
    return new NextResponse("Invalid id", { status: 400 });
  }

  const body = await request.json();
  await updateExpenseForUser(session.user.email, expenseId, {
    description: body.description,
    amount: body.amount,
    category: body.category,
    date: body.date,
    receiptUrl: body.receiptUrl,
  });

  return new NextResponse("Updated", { status: 200 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const expenseId = Number(id);
  if (Number.isNaN(expenseId)) {
    return new NextResponse("Invalid id", { status: 400 });
  }

  await deleteExpenseForUser(session.user.email, expenseId);
  return new NextResponse("Deleted", { status: 200 });
}

