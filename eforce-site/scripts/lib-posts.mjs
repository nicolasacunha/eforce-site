import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
export const LANGS = ["pt", "en"];

export function postsDir(lang) {
  return path.join(ROOT, "content", lang, "news");
}

export function listPostFiles(lang) {
  const dir = postsDir(lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

export function readPost(lang, file) {
  const raw = fs.readFileSync(path.join(postsDir(lang), file), "utf8");
  const { data, content } = matter(raw);
  return { data, body: content.trim(), slug: file.replace(/\.md$/, "") };
}
