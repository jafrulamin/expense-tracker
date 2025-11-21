import { auth } from "@/auth/config";
import { deleteExpenseForUser } from "@/app/lib/expenses";
import { NextResponse } from "next/server";

type RouteParams = {
  params: { id: string };
};

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return new NextResponse("Invalid id", { status: 400 });
  }

  await deleteExpenseForUser(session.user.email, id);
  return new NextResponse("Deleted", { status: 200 });
}

