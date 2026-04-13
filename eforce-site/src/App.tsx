import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import '@/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TransitionProvider } from '@/context/TransitionContext';
import CurtainOverlay from '@/components/layout/CurtainOverlay';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const StoryPage = lazy(() => import('@/pages/StoryPage'));
const TechnologyPage = lazy(() => import('@/pages/TechnologyPage'));
const DealersPage = lazy(() => import('@/pages/DealersPage'));
const SupportPage = lazy(() => import('@/pages/SupportPage'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(255,255,255,0.15)] border-t-brand-orange" />
    </div>
  );
}

function Layout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n: i18nInstance } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (lang) {
      i18nInstance.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang, i18nInstance]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <TransitionProvider>
      <CurtainOverlay />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </TransitionProvider>
  );
}

function RootRedirect() {
  return <Navigate to="/en" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Suspense fallback={<LoadingFallback />}><HomePage /></Suspense>} />
          <Route path="kits/:model" element={<Suspense fallback={<LoadingFallback />}><ProductDetailPage /></Suspense>} />
          <Route path="story" element={<Suspense fallback={<LoadingFallback />}><StoryPage /></Suspense>} />
          <Route path="technology" element={<Suspense fallback={<LoadingFallback />}><TechnologyPage /></Suspense>} />
          <Route path="dealers" element={<Suspense fallback={<LoadingFallback />}><DealersPage /></Suspense>} />
          <Route path="support" element={<Suspense fallback={<LoadingFallback />}><SupportPage /></Suspense>} />
          <Route path="news" element={<Suspense fallback={<LoadingFallback />}><NewsPage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
