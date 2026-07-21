"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { updateWithdrawal } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userRole = cookieStore.get("user_role")?.value;

    if (userRole !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updated = await updateWithdrawal(id, { status });

    return NextResponse.json({ ok: true, withdrawal: updated });
  } catch (error) {
    console.error("Withdrawal approve error", error);
    return NextResponse.json({ error: "Failed to update withdrawal" }, { status: 500 });
  }
}