"use server";

import { addUser, getUsers } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 });
    }

    const users = await getUsers();
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const user = {
      id: crypto.randomUUID(),
      email,
      name,
      password,
      role: "user" as const,
    };

    await addUser(user);

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
    console.error("Register error", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}