import { NextResponse } from "next/server";
import { validateCredentials, generateToken, validateToken } from "@/lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();
  if (validateCredentials(username, password)) {
    const token = generateToken();
    return NextResponse.json({ token });
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

export async function GET(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (validateToken(token)) {
    return NextResponse.json({ valid: true });
  }
  return NextResponse.json({ valid: false }, { status: 401 });
}
