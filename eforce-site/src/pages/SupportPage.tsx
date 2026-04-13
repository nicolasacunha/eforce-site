import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/layout/SEO';

export default function SupportPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? 'en';

  return (
    <>
      <SEO
        title={`${t('nav.support')} | E-Force`}
        description="Baixe o manual do seu kit E-Force, acesse a garantia e entre em contato com nosso suporte."
        lang={currentLang}
        path="support"
      />

      {/* Divider top spacing */}
      <div style={{ height: "clamp(4rem, 8vh, 6rem)", background: "#0a0a0a" }} />

      {/* Manuais */}
      <section style={{ background: "#0a0a0a", padding: "0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vh, 7rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            MANUAIS
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            Baixe o manual do seu kit.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { name: "EF2 V1", img: "/assets/images/kits/ef2v1-manual.webp", href: "/assets/manuais/manual-ef2v1.pdf" },
              { name: "EF2 V2", img: "/assets/images/kits/ef2v2-manual.webp", href: "/assets/manuais/manual-ef2v2.pdf" },
              { name: "EF2 V3", img: "/assets/images/kits/ef2v3-manual.webp", href: "/assets/manuais/manual-ef2v3.pdf" },
              { name: "EF2 V4", img: "/assets/images/kits/ef2v4-manual.webp", href: "/assets/manuais/manual-ef2v4.pdf" },
              { name: "EF5 V2", img: "/assets/images/kits/ef5v2-manual.webp", href: "/assets/manuais/manual-ef5v2.pdf" },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(1.5rem, 4vw, 3rem)",
                  padding: "clamp(1.2rem, 3vh, 2rem) 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div style={{ flexShrink: 0, width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                    {item.name}
                  </p>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "12px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Manual do Usuário — PDF
                  </p>
                </div>
                <DownloadButton href={item.href} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Garantia */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            GARANTIA
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            Política de garantia E-Force.
          </h2>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(1.5rem, 4vw, 3rem)",
                padding: "clamp(1.2rem, 3vh, 2rem) 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ flexShrink: 0, width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  Garantia E-Force
                </p>
                <p style={{ margin: "0.25rem 0 0", fontSize: "12px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Política de Garantia — PDF
                </p>
              </div>
              <DownloadButton href="/assets/manuais/garantia-eforce.pdf" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* Contate-nos */}
      <section style={{ background: "#0a0a0a", padding: "clamp(4rem, 8vh, 7rem) clamp(1.5rem, 6vw, 5rem)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E8500A", marginBottom: "0.5rem" }}>
            CONTATO
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            Contate-nos.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px" }}>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.1rem 1.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
                background: "rgba(255,255,255,0.02)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#25D366"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)"; }}
            >
              <svg width="22" height="22" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff" }}>WhatsApp</span>
            </a>

            <a
              href="mailto:eforce@odery.com.br"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.1rem 1.5rem",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
                background: "rgba(255,255,255,0.02)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8500A"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(232,80,10,0.06)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)"; }}
            >
              <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.6)" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff" }}>eforce@odery.com.br</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function DownloadButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      style={{
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
        fontWeight: 600,
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "4px",
        padding: "0.55rem 1.2rem",
        textDecoration: "none",
        transition: "border-color 0.2s, color 0.2s",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E8500A";
        (e.currentTarget as HTMLAnchorElement).style.color = "#E8500A";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
      }}
    >
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
      </svg>
      Download
    </a>
  );
}
