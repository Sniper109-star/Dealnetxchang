import { addUser } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }

    const user = {
      id: crypto.randomUUID(),
      email,
      name,
    };

    await addUser(user);

    const response = NextResponse.json({ ok: true, user });
    response.cookies.set("user_id", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
