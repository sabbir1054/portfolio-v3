import fs from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "data", "db");
const BLOGS_FILE = path.join(DB_DIR, "blogs.json");
const PORTFOLIOS_FILE = path.join(DB_DIR, "portfolios.json");

function ensureDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(BLOGS_FILE)) {
    fs.writeFileSync(BLOGS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(PORTFOLIOS_FILE)) {
    fs.writeFileSync(PORTFOLIOS_FILE, JSON.stringify([], null, 2));
  }
}

export function getBlogs() {
  ensureDB();
  return JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));
}

export function saveBlogs(blogs) {
  ensureDB();
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
}

export function getPortfolios() {
  ensureDB();
  return JSON.parse(fs.readFileSync(PORTFOLIOS_FILE, "utf-8"));
}

export function savePortfolios(portfolios) {
  ensureDB();
  fs.writeFileSync(PORTFOLIOS_FILE, JSON.stringify(portfolios, null, 2));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

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
