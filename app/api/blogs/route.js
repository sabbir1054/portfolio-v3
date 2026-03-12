import { NextResponse } from "next/server";
import { getBlogs, createBlog } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET() {
  const blogs = await getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const newBlog = await createBlog(body);
  return NextResponse.json(newBlog, { status: 201 });
}
