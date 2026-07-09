import { marked } from "marked";

const BASE = "https://www.eforcedrums.com";

// Conjunto de imagens OG (1200×630) que rotacionam entre os posts. A escolha é
// determinística pelo slug: cada post mantém sempre a mesma imagem (estável em
// rebuilds e no cache dos crawlers), mas posts diferentes recebem imagens
// diferentes. Para adicionar variação, é só dropar mais `og-N.webp` na pasta e
// incluir aqui.
const OG_SET = [
  "/assets/images/og/og-1.webp",
  "/assets/images/og/og-2.webp",
  "/assets/images/og/og-3.webp",
  "/assets/images/og/og-4.webp",
];

function ogImage(key) {
  if (!key) return OG_SET[0];
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return OG_SET[h % OG_SET.length];
}

export function esc(s = "") {
  return String(s).replace(/[<>&"']/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]);
}

function head({ lang, slug, data, isIndex }) {
  const pathSeg = isIndex ? `/${lang}/news/` : `/${lang}/news/${slug}/`;
  const url = `${BASE}${pathSeg}`;
  const other = lang === "pt" ? "en" : "pt";
  const otherUrl = isIndex ? `${BASE}/${other}/news/` : `${BASE}/${other}/news/${slug}/`;
  const og = `${BASE}${ogImage(isIndex ? `${lang}-index` : slug)}`;
  const jsonld = isIndex ? [] : [{
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: data.title, description: data.description,
    datePublished: data.publishedAt, dateModified: data.updatedAt ?? data.publishedAt,
    author: { "@type": "Person", name: data.author ?? "Nicolas Cunha" },
    publisher: { "@type": "Organization", name: "E-Force" },
    mainEntityOfPage: url,
  }, {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Novidades", item: `${BASE}/${lang}/news/` },
      { "@type": "ListItem", position: 2, name: data.title, item: url },
    ],
  }];
  if (!isIndex && Array.isArray(data.faq) && data.faq.length) {
    jsonld.push({ "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: data.faq.map((f) => ({ "@type": "Question", name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a } })) });
  }
  return `<!doctype html><html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(data.title)} | E-Force</title>
<meta name="description" content="${esc(data.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${lang}" href="${url}">
<link rel="alternate" hreflang="${other}" href="${otherUrl}">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${esc(data.title)}">
<meta property="og:description" content="${esc(data.description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${og}">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("")}
<style>
:root{--bg:#0a0a0a;--fg:#ececec;--muted:rgba(255,255,255,.55);--orange:#ff4a1c;--line:rgba(255,255,255,.12)}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.7}
a{color:var(--orange);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:44rem;margin:0 auto;padding:2rem 1.25rem 5rem}
.top{max-width:44rem;margin:0 auto;padding:1.25rem;display:flex;justify-content:space-between;border-bottom:1px solid var(--line)}
.brand{font-weight:800;letter-spacing:.08em;color:#fff}
h1{font-size:clamp(1.9rem,4vw,2.9rem);line-height:1.08;margin:.4rem 0 .6rem;color:#fff}
h2{font-size:1.4rem;margin:2.4rem 0 .8rem;color:#fff}
.meta{color:var(--muted);font-size:.85rem;margin-bottom:2rem}
.eyebrow{color:var(--orange);font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase}
.prose p{margin:1.1rem 0}.prose img{max-width:100%;border-radius:6px}
details{border:1px solid var(--line);border-radius:6px;margin:.6rem 0;padding:.4rem .9rem}
summary{cursor:pointer;font-weight:700;color:#fff;padding:.5rem 0}
.related{margin-top:3rem;border-top:1px solid var(--line);padding-top:1.5rem}
.related a{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:.5rem 1rem;margin:.3rem .3rem 0 0;color:#fff}
.card{display:block;border:1px solid var(--line);border-radius:8px;padding:1.1rem 1.25rem;margin:1rem 0;color:#fff}
.card:hover{border-color:var(--orange);text-decoration:none}.card small{color:var(--muted)}
</style></head><body>
<div class="top"><a class="brand" href="/${lang}/">E-FORCE</a><a href="/${lang}/news/">Novidades</a></div>`;
}

const foot = `</body></html>`;

export function renderPost({ lang, slug, data, html, related }) {
  const relBlock = related?.length
    ? `<div class="related"><span class="eyebrow">Kits E-Force</span><div>${related
        .map((r) => `<a href="/${lang}/kits/${r}">${esc(r)}</a>`).join("")}</div></div>`
    : "";
  const faqBlock = Array.isArray(data.faq) && data.faq.length
    ? `<h2>FAQ</h2>${data.faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}`
    : "";
  return head({ lang, slug, data, isIndex: false }) +
    `<article class="wrap"><span class="eyebrow">Novidades</span>
<h1>${esc(data.title)}</h1><p class="meta">${esc(data.publishedAt)} · ${esc(data.author ?? "Nicolas Cunha")}</p>
<div class="prose">${html}</div>${faqBlock}${relBlock}</article>` + foot;
}

export function renderIndex({ lang, posts }) {
  const data = {
    title: lang === "pt" ? "Novidades" : "News",
    description: lang === "pt"
      ? "Guias e conhecimento sobre bateria eletrônica, tecnologia e gravação."
      : "Guides and know-how on electronic drums, technology and recording.",
  };
  const cards = posts.map((p) =>
    `<a class="card" href="/${lang}/news/${p.slug}/"><strong>${esc(p.data.title)}</strong><br><small>${esc(p.data.publishedAt)}</small><br>${esc(p.data.description)}</a>`
  ).join("");
  return head({ lang, slug: "", data, isIndex: true }) +
    `<main class="wrap"><span class="eyebrow">${lang === "pt" ? "Novidades" : "News"}</span>
<h1>${esc(data.title)}</h1><p class="meta">${esc(data.description)}</p>${cards}</main>` + foot;
}
