"use server";

import { getUsers } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const users = await getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    response.cookies.set("user_id", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    response.cookies.set("user_role", user.role, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}