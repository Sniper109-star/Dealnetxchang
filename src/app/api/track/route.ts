import { addEvent } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = {
      type: body.type,
      userId: body.userId,
      metadata: body.metadata ?? {},
    };

    await addEvent(event);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Track error", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
