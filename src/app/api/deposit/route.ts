import { addDeposit, addEvent } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    const deposit = {
      id: crypto.randomUUID(),
      userId,
      amount,
      status: "completed",
      createdAt: new Date().toISOString(),
    };

    await addDeposit(deposit);

    await addEvent({
      userId,
      type: "deposit",
      metadata: { amount },
    });

    await addEvent({
      userId,
      type: "conversion",
      metadata: { event: "deposit" },
    });

    return NextResponse.json({ ok: true, deposit }, { status: 200 });
  } catch (error) {
    console.error("Deposit error", error);
    return NextResponse.json({ error: "Failed to process deposit" }, { status: 500 });
  }
}
