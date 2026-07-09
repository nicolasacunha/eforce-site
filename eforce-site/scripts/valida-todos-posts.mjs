import fs from "node:fs";
import path from "node:path";
import { LANGS, postsDir, listPostFiles } from "./lib-posts.mjs";
import { validatePost, loadBanned } from "./valida-post.mjs";
import matter from "gray-matter";

const banned = loadBanned();
let checked = 0, failed = 0;
for (const lang of LANGS) {
  for (const file of listPostFiles(lang)) {
    const full = path.join(postsDir(lang), file);
    const raw = fs.readFileSync(full, "utf8");
    if (matter(raw).data.draft === true) continue;
    const errs = validatePost(raw, { banned });
    checked++;
    if (errs.length) { failed++; console.error(`REPROVADO ${lang}/${file}:`); errs.forEach((e) => console.error("  - " + e)); }
  }
}
console.log(`${checked} verificado(s), ${failed} reprovado(s)`);
process.exit(failed ? 1 : 0);
