import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getKycs, addKyc } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const kycs = await getKycs();
    const userKycs = kycs.filter((k) => k.userId === userId).sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    return NextResponse.json({ kycs: userKycs });
  } catch (error) {
    console.error("KYC error", error);
    return NextResponse.json({ error: "Failed to load KYC" }, { status: 500 });
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
    const { fullName, documentType, documentNumber } = body;

    if (!fullName || !documentType || !documentNumber) {
      return NextResponse.json({ error: "Full name, document type, and number are required" }, { status: 400 });
    }

    const kyc = {
      id: crypto.randomUUID(),
      userId,
      fullName,
      documentType,
      documentNumber,
      status: "pending" as const,
      submittedAt: new Date().toISOString(),
    };

    await addKyc(kyc);

    return NextResponse.json({ ok: true, kyc }, { status: 200 });
  } catch (error) {
    console.error("KYC submit error", error);
    return NextResponse.json({ error: "Failed to submit KYC" }, { status: 500 });
  }
}