import { NextResponse } from "next/server";
import { getPortfolios, savePortfolios, slugify } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const portfolios = getPortfolios();
  const item = portfolios.find((p) => p.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request, { params }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const portfolios = getPortfolios();
  const index = portfolios.findIndex((p) => p.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  portfolios[index] = {
    ...portfolios[index],
    ...body,
    slug: slugify(body.title || portfolios[index].title),
    updatedAt: new Date().toISOString(),
  };
  savePortfolios(portfolios);
  return NextResponse.json(portfolios[index]);
}

export async function DELETE(request, { params }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const portfolios = getPortfolios();
  const filtered = portfolios.filter((p) => p.id !== id);
  if (filtered.length === portfolios.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  savePortfolios(filtered);
  return NextResponse.json({ success: true });
}
