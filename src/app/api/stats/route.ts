import { getStats, getEvents, getDeposits, getUsers } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await getEvents();
    const deposits = await getDeposits();
    const users = await getUsers();
    const stats = await getStats();

    return NextResponse.json({
      stats,
      events: events.slice(-100).reverse(),
      deposits: deposits.slice(-50).reverse(),
      users: users.slice(-50).reverse(),
    });
  } catch (error) {
    console.error("Stats error", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
