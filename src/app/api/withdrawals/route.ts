import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getWithdrawals, addWithdrawal } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const withdrawals = await getWithdrawals();
    const userWithdrawals = withdrawals.filter((w) => w.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ withdrawals: userWithdrawals });
  } catch (error) {
    console.error("Withdrawals error", error);
    return NextResponse.json({ error: "Failed to load withdrawals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const withdrawal = {
      id: crypto.randomUUID(),
      userId,
      amount,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    await addWithdrawal(withdrawal);

    return NextResponse.json({ ok: true, withdrawal }, { status: 200 });
  } catch (error) {
    console.error("Withdrawal error", error);
    return NextResponse.json({ error: "Failed to create withdrawal" }, { status: 500 });
  }
}