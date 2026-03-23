import { NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";
import { verifyOTP } from "@/lib/otp";

const ADMIN_EMAIL = "mdsabbir1054@gmail.com";

export async function POST(request) {
  const { otp } = await request.json();

  const result = await verifyOTP(ADMIN_EMAIL, otp);

  if (result.valid) {
    const token = generateToken();
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: result.error }, { status: 401 });
}
