import { NextResponse } from "next/server";
import { getBlogs, saveBlogs, generateId, slugify } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET() {
  const blogs = getBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const blogs = getBlogs();
  const newBlog = {
    id: generateId(),
    title: body.title,
    slug: slugify(body.title),
    description: body.description,
    content: body.content || "",
    imageSrc: body.imageSrc || "",
    tags: body.tags || [],
    categories: body.categories || [],
    author: body.author || "Admin",
    date: body.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogs.unshift(newBlog);
  saveBlogs(blogs);
  return NextResponse.json(newBlog, { status: 201 });
}
