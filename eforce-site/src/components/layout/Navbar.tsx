import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const languages = [
    { code: "pt", label: "PT", flag: "\u{1F1E7}\u{1F1F7}" },
    { code: "en", label: "EN", flag: "\u{1F1FA}\u{1F1F8}" },
    { code: "es", label: "ES", flag: "\u{1F1EA}\u{1F1F8}" },
    { code: "it", label: "IT", flag: "\u{1F1EE}\u{1F1F9}" },
    { code: "zh", label: "ZH", flag: "\u{1F1E8}\u{1F1F3}" },
  ];

  const switchLanguage = (newLang: string) => {
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    i18n.changeLanguage(newLang);
    setLangOpen(false);
    window.location.href = newPath;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md" : "bg-transparent"
        }`}
        style={!scrolled ? { background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" } : undefined}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-white hover:text-neutral-400 transition-colors"
            aria-label="Abrir menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="text-sm hidden md:inline">Menu</span>
          </button>

          <Link
            to={`/${lang}`}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <img
              src="/assets/images/brand/eforce-logo-white.png"
              alt="E-Force"
              className="h-12"
            />
          </Link>

          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-white hover:text-neutral-400 transition-colors"
              aria-label="Selecionar idioma"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#111] border border-[rgba(255,255,255,0.08)] rounded-lg py-2 min-w-[120px] shadow-md">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLanguage(l.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[rgba(255,255,255,0.05)] transition-colors ${
                      lang === l.code ? "text-brand-orange" : "text-[rgba(255,255,255,0.7)]"
                    }`}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}
