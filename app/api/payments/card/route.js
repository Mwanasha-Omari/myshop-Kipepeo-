import { NextResponse } from "next/server";

export async function POST(request) {
  const { amount, cardDetails } = await request.json();

  if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
    return NextResponse.json({ error: "Missing card details" }, { status: 400 });
  }
  return NextResponse.json({ success: true, amount });
}