import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';

const navLinks = [
  { key: 'home', path: '' },
  { key: 'line', path: 'line' },
  { key: 'story', path: 'story' },
  { key: 'technology', path: 'technology' },
  { key: 'dealers', path: 'dealers' },
] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.22 8.22 0 005.58 2.18V11.7a4.85 4.85 0 01-3.77-1.84V6.69h3.77z" />
    </svg>
  );
}

export default function Footer() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentLang = lang ?? 'en';

  function switchLanguage(code: string) {
    const pathAfterLang = location.pathname.replace(`/${currentLang}`, '') || '/';
    navigate(`/${code}${pathAfterLang === '/' ? '' : pathAfterLang}`);
  }

  return (
    <footer className="border-t border-brand-border bg-brand-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Column 1: Logo + tagline */}
          <div>
            <img
              src="/assets/images/brand/eforce-logo-white.png"
              alt="E-Force"
              className="h-6"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-white/50">
              {t('nav.home')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={`/${currentLang}/${link.path}`}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-white/50">
              {t('footer.connect', 'Connect')}
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/eforcedrums"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-brand-orange"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@eforcedrums"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-brand-orange"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://tiktok.com/@eforcedrums"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-brand-orange"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Column 4: Language switcher */}
          <div>
            <h4 className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-white/50">
              {t('footer.language', 'Language')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {supportedLanguages.map((sl) => (
                <button
                  key={sl.code}
                  onClick={() => switchLanguage(sl.code)}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    sl.code === currentLang
                      ? 'bg-brand-orange text-white'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {sl.flag} {sl.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-8 text-xs text-white/50 md:flex-row">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <Link
              to={`/${currentLang}/privacy`}
              className="transition-colors hover:text-white"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              to={`/${currentLang}/terms`}
              className="transition-colors hover:text-white"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
