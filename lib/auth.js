const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export function validateCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function generateToken() {
  const payload = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return Buffer.from(`admin:${payload}:${Date.now()}`).toString("base64");
}

export function validateToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts[0] !== "admin") return false;
    const timestamp = parseInt(parts[2]);
    // Token expires after 24 hours
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}
