import { NextResponse } from "next/server";
import { getBlogs, saveBlogs, slugify } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const blogs = getBlogs();
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(request, { params }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const blogs = getBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  blogs[index] = {
    ...blogs[index],
    ...body,
    slug: slugify(body.title || blogs[index].title),
    updatedAt: new Date().toISOString(),
  };
  saveBlogs(blogs);
  return NextResponse.json(blogs[index]);
}

export async function DELETE(request, { params }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const blogs = getBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  if (filtered.length === blogs.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  saveBlogs(filtered);
  return NextResponse.json({ success: true });
}
