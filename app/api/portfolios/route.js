import { NextResponse } from "next/server";
import { getPortfolios, savePortfolios, generateId, slugify } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET() {
  const portfolios = getPortfolios();
  return NextResponse.json(portfolios);
}

export async function POST(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const portfolios = getPortfolios();
  const newPortfolio = {
    id: generateId(),
    title: body.title,
    slug: slugify(body.title),
    description: body.description || "",
    content: body.content || "",
    imageSrc: body.imageSrc || "",
    tags: body.tags || [],
    categories: body.categories || [],
    width: body.width || 1920,
    height: body.height || 1572,
    liveUrl: body.liveUrl || "",
    githubUrl: body.githubUrl || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  portfolios.unshift(newPortfolio);
  savePortfolios(portfolios);
  return NextResponse.json(newPortfolio, { status: 201 });
}
