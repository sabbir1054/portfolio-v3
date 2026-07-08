import prisma from "./prisma";

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// --- Blogs ---

export async function getBlogs() {
  return prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getBlogById(id) {
  return prisma.blog.findUnique({ where: { id } });
}

export async function createBlog(data) {
  return prisma.blog.create({
    data: {
      title: data.title,
      slug: slugify(data.title),
      description: data.description || "",
      content: data.content || "",
      contentType: data.contentType || "html",
      imageSrc: data.imageSrc || "",
      tags: data.tags || [],
      categories: data.categories || [],
      author: data.author || "Admin",
      date:
        data.date ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        }),
    },
  });
}

export async function updateBlog(id, data) {
  const updateData = { ...data };
  if (data.title) updateData.slug = slugify(data.title);
  delete updateData.id;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  return prisma.blog.update({ where: { id }, data: updateData });
}

export async function deleteBlog(id) {
  await prisma.blog.delete({ where: { id } });
}

// --- Portfolios ---

export async function getPortfolios() {
  return prisma.portfolio.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPortfolioById(id) {
  return prisma.portfolio.findUnique({ where: { id } });
}

export async function createPortfolio(data) {
  return prisma.portfolio.create({
    data: {
      title: data.title,
      slug: slugify(data.title),
      description: data.description || "",
      content: data.content || "",
      imageSrc: data.imageSrc || "",
      tags: data.tags || [],
      categories: data.categories || [],
      width: data.width || 1920,
      height: data.height || 1572,
      liveUrl: data.liveUrl || "",
      githubUrl: data.githubUrl || "",
    },
  });
}

export async function updatePortfolio(id, data) {
  const updateData = { ...data };
  if (data.title) updateData.slug = slugify(data.title);
  delete updateData.id;
  delete updateData.createdAt;
  delete updateData.updatedAt;

  return prisma.portfolio.update({ where: { id }, data: updateData });
}

export async function deletePortfolio(id) {
  await prisma.portfolio.delete({ where: { id } });
}
