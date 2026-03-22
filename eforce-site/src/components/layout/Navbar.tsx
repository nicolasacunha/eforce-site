import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { supportedLanguages } from '@/i18n';

const navLinks = [
  { key: 'home', path: '' },
  { key: 'line', path: 'line' },
  { key: 'story', path: 'story' },
  { key: 'technology', path: 'technology' },
  { key: 'dealers', path: 'dealers' },
] as const;

export default function Navbar() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [heroExpanded, setHeroExpanded] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = lang ?? 'en';
  const currentLanguage = supportedLanguages.find((l) => l.code === currentLang) ?? supportedLanguages[0];

  // Check if we're on the homepage (hero scroll-expansion is active)
  const isHomepage = location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Listen for hero expansion events
  useEffect(() => {
    if (!isHomepage) {
      setHeroExpanded(true); // Always show navbar on non-homepage
      return;
    }
    setHeroExpanded(false); // Hide on homepage until hero expands
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setHeroExpanded(detail);
    };
    window.addEventListener('hero-expanded', handler);
    return () => window.removeEventListener('hero-expanded', handler);
  }, [isHomepage]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!langOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  function switchLanguage(code: string) {
    const pathAfterLang = location.pathname.replace(`/${currentLang}`, '') || '/';
    navigate(`/${code}${pathAfterLang === '/' ? '' : pathAfterLang}`);
    setLangOpen(false);
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 z-50 w-full"
        initial={false}
        animate={{
          y: heroExpanded ? 0 : -100,
          opacity: heroExpanded ? 1 : 0,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to={`/${currentLang}`} className="shrink-0">
            <img
              src="/assets/images/brand/eforce-logo-dark.png"
              alt="E-Force"
              className="h-7"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={`/${currentLang}/${link.path}`}
                  className="font-body text-sm text-[rgba(0,0,0,0.5)] transition-colors hover:text-[#0a0a0a]"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div ref={langDropdownRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-[rgba(0,0,0,0.5)] transition-colors hover:text-[#0a0a0a]"
              >
                <span>{currentLanguage.flag}</span>
                <span className="hidden uppercase sm:inline">{currentLang}</span>
                <svg
                  className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-40 overflow-hidden rounded-lg border border-[rgba(0,0,0,0.08)] bg-white"
                  >
                    {supportedLanguages.map((sl) => (
                      <li key={sl.code}>
                        <button
                          onClick={() => switchLanguage(sl.code)}
                          className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-black/5 ${
                            sl.code === currentLang
                              ? 'text-brand-orange'
                              : 'text-[rgba(0,0,0,0.5)]'
                          }`}
                        >
                          <span>{sl.flag}</span>
                          <span>{sl.name}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.span
                className="block h-0.5 w-5 bg-white"
                animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-white"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-white"
                animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[rgba(255,255,255,0.98)] backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={`/${currentLang}/${link.path}`}
                  className="font-display text-2xl font-semibold text-[#0a0a0a] transition-colors hover:text-brand-orange"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </nav>

            <div className="mt-12 flex gap-3">
              {supportedLanguages.map((sl) => (
                <button
                  key={sl.code}
                  onClick={() => {
                    switchLanguage(sl.code);
                    setMobileOpen(false);
                  }}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    sl.code === currentLang
                      ? 'bg-brand-orange text-white'
                      : 'text-[rgba(0,0,0,0.5)] hover:text-[#0a0a0a]'
                  }`}
                >
                  {sl.flag} {sl.code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
