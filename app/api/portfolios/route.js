import { NextResponse } from "next/server";
import { getPortfolios, createPortfolio } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET() {
  const portfolios = await getPortfolios();
  return NextResponse.json(portfolios);
}

export async function POST(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const newPortfolio = await createPortfolio(body);
  return NextResponse.json(newPortfolio, { status: 201 });
}
