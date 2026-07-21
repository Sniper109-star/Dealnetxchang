"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUsers, updateKyc } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;
    const userRole = cookieStore.get("user_role")?.value;

    if (!userId || userRole !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updated = await updateKyc(id, { status });

    return NextResponse.json({ ok: true, kyc: updated });
  } catch (error) {
    console.error("KYC approve error", error);
    return NextResponse.json({ error: "Failed to update KYC" }, { status: 500 });
  }
}