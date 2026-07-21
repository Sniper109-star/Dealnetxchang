import { getDeposits, getWithdrawals } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const deposits = await getDeposits();
    const withdrawals = await getWithdrawals();

    const transactions = [
      ...deposits.map((d) => ({ ...d, type: "deposit" })),
      ...withdrawals.map((w) => ({ ...w, type: "withdrawal" })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Transactions error", error);
    return NextResponse.json({ error: "Failed to load transactions" }, { status: 500 });
  }
}