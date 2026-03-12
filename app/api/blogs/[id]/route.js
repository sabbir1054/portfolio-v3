import { NextResponse } from "next/server";
import { getBlogById, updateBlog, deleteBlog } from "@/lib/db";
import { validateToken } from "@/lib/auth";

export async function GET(request, { params }) {
  const { id } = await params;
  const blog = await getBlogById(id);
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
  try {
    const blog = await updateBlog(id, body);
    return NextResponse.json(blog);
  } catch (e) {
    if (e.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw e;
  }
}

export async function DELETE(request, { params }) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!validateToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteBlog(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    throw e;
  }
}
