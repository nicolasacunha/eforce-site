import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';

type PriceFilter = 'all' | 'under5k' | '5to10k' | 'over10k';

const filterRanges: Record<PriceFilter, [number, number]> = {
  all: [0, Infinity],
  under5k: [0, 5000],
  '5to10k': [5000, 10000],
  over10k: [10000, Infinity],
};

export default function LinePage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [activeFilter, setActiveFilter] = useState<PriceFilter>('all');
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);

  const currentLang = lang ?? 'en';

  const filters: { key: PriceFilter; label: string }[] = [
    { key: 'all', label: t('line.filterAll') },
    { key: 'under5k', label: t('line.filterUnder5k') },
    { key: '5to10k', label: t('line.filter5to10k') },
    { key: 'over10k', label: t('line.filterOver10k') },
  ];

  const [min, max] = filterRanges[activeFilter];
  const filtered = products.filter((p) => p.priceValue >= min && p.priceValue < max);

  return (
    <>
      <SEO
        title={`${t('line.headline')} | E-Force`}
        description={t('line.sub')}
        lang={currentLang}
        path="line"
      />

      {/* Hero header */}
      <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          ref={headerRef}
          className="mx-auto max-w-7xl px-6 text-center"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {t('home.theLine')}
          </span>
          <h1
            className="mt-4 font-display font-bold leading-tight text-[#0a0a0a]"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 7rem)' }}
          >
            {t('line.headline')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-brand-text-secondary md:text-xl">
            {t('line.sub')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.key
                    ? 'bg-brand-orange text-white'
                    : 'border border-[rgba(0,0,0,0.08)] text-[rgba(0,0,0,0.5)] hover:border-brand-text-secondary hover:text-brand-text-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="bg-white pb-24 pt-16 md:pb-32">
        <div
          ref={gridRef}
          className="mx-auto max-w-7xl px-6"
          style={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/${currentLang}/kits/${product.slug}`}
                  className="group"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`relative overflow-hidden rounded-xl border bg-[#f7f7f7] transition-all duration-500 hover:border-brand-orange/30 ${
                      product.id === 'ef2v2'
                        ? 'border-brand-orange/30 shadow-lg shadow-brand-orange/5'
                        : 'border-brand-border'
                    }`}
                  >
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 right-4 z-10 rounded-full bg-brand-orange px-3 py-1 font-display text-xs font-semibold text-white">
                        {product.badge}
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-white">
                      <img
                        src={product.heroImage}
                        alt={product.name}
                        className="h-full w-full object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="font-display text-xl font-bold text-brand-text-primary">
                            {product.name}
                          </h2>
                          <p className="mt-1 font-body text-sm text-brand-text-secondary">
                            {product.tagline}
                          </p>
                        </div>
                        <span className="rounded-md bg-[#f0f0f0] px-2.5 py-1 font-mono text-xs text-brand-text-secondary">
                          {product.module}
                        </span>
                      </div>

                      <p className="mt-4 font-body text-sm leading-relaxed text-brand-text-secondary/80">
                        {product.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-mono text-sm text-brand-text-secondary">
                          {t('line.from')} {product.price}
                        </span>
                        <span className="font-display text-sm font-semibold text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {t('line.viewKit')} →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-display text-lg text-brand-text-secondary">
                No models in this price range.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
