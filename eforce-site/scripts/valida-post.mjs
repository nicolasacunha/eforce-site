import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DADOS = path.resolve(SCRIPT_DIR, "../content/dados");
const DIRTY = /&#\d+;|&[a-z]+;|Continue reading|" \/>/i;
const PRICE = /R\$\s*\d|\b\d+\s*dias\b|garantia de|\bgrátis\b|\bdesconto\b|\bpromoção\b/i;
// Casa tags HTML cruas (<script>, </script>, <img ...>, <b>, etc.), mas não um
// "<" solto seguido de espaço (ex.: "latência < 10ms") nem links markdown.
const RAW_HTML = /<\/?[a-z][^>]*>/i;

export function loadBanned(dir = DEFAULT_DADOS) {
  return fs.readFileSync(path.join(dir, "marcas-banidas.txt"), "utf8")
    .split("\n").map((s) => s.trim()).filter(Boolean);
}

export function validatePost(raw, { banned }) {
  const errs = [];
  const { data, content } = matter(raw);
  const body = content.trim();
  const text = `${data.title ?? ""} ${data.description ?? ""} ${body}`;
  if (data.type !== "post") errs.push('type deve ser "post"');
  for (const f of ["title", "description", "publishedAt"])
    if (!data[f]) errs.push(`frontmatter: ${f} ausente`);
  const desc = String(data.description ?? "");
  if (desc.length < 120 || desc.length > 160) errs.push(`description ${desc.length} chars (esperado 120–160)`);
  const words = body ? body.split(/\s+/).length : 0;
  if (words < 600) errs.push(`corpo ${words} palavras (mínimo 600)`);
  const internal = (body.match(/\]\(\/(pt|en)\//g) ?? []).length;
  if (internal < 3) errs.push(`${internal} links internos (mínimo 3)`);
  const faq = Array.isArray(data.faq) ? data.faq.length : 0;
  if (faq < 3) errs.push(`${faq} itens de FAQ (mínimo 3)`);
  for (const b of banned) {
    const re = new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) errs.push(`marca proibida: ${b}`);
  }
  if (PRICE.test(text)) errs.push("preço/promessa/garantia (proibido)");
  if (DIRTY.test(text)) errs.push("resíduo de importação");
  if (RAW_HTML.test(body)) errs.push("HTML cru no corpo (proibido)");
  return errs;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const file = process.argv[2];
  if (!file) { console.error("uso: node scripts/valida-post.mjs <arquivo.md>"); process.exit(2); }
  const errs = validatePost(fs.readFileSync(file, "utf8"), { banned: loadBanned() });
  if (errs.length) { console.error(`REPROVADO (${file}):`); errs.forEach((e) => console.error("  - " + e)); process.exit(1); }
  console.log(`OK: ${file}`); process.exit(0);
}
