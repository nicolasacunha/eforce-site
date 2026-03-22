import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();

  return (
    <div className="bg-brand-black min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center">
      <h1 className="font-display text-8xl font-bold text-brand-orange">404</h1>
      <p className="mt-4 font-display text-2xl text-white">
        {t('notFound.title', 'Page not found')}
      </p>
      <p className="mt-2 text-neutral-400">
        {t('notFound.message', 'The page you are looking for does not exist or has been moved.')}
      </p>
      <Link
        to={`/${lang ?? 'en'}`}
        className="mt-8 inline-block rounded-full bg-brand-orange px-8 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover"
      >
        {t('notFound.cta', 'Back to Home')}
      </Link>
    </div>
  );
}
