import assert from "node:assert";
import { validatePost } from "./valida-post.mjs";
const banned = ["Roland", "Alesis"];
const bom = `---\ntype: post\ntitle: X\ndescription: ${"a".repeat(140)}\npublishedAt: "2026-07-08"\nfaq:\n  - q: a\n    a: b\n  - q: c\n    a: d\n  - q: e\n    a: f\n---\n${"palavra ".repeat(620)}\n[a](/pt/kits/ef2-v1) [b](/en/technology) [c](/pt/kits/ef2-v2)`;
assert.equal(validatePost(bom, { banned }).length, 0, "post bom passa");
assert.ok(validatePost(bom.replace("palavra", "Roland"), { banned }).some((e) => /Roland/.test(e)), "pega marca");
assert.ok(validatePost(bom + " R$ 2.000", { banned }).some((e) => /preço/.test(e)), "pega preço");
assert.ok(validatePost(bom.replace(("palavra ".repeat(620)), "curto"), { banned }).some((e) => /palavras/.test(e)), "pega corpo curto");
console.log("todos os casos ok");
