import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getProductBySlug, getAdjacentProducts } from '@/data/products';
import type { Product } from '@/data/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';
import FinishSelector from '@/components/product/FinishSelector';
import ProductGallery from '@/components/product/ProductGallery';
import SpecTable from '@/components/product/SpecTable';
import InTheBox from '@/components/product/InTheBox';
import CompareModels from '@/components/product/CompareModels';

/* ------------------------------------------------------------------ */
/*  Animation helpers (matching homepage HeroSection pattern)          */
/* ------------------------------------------------------------------ */

const ease = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  };
}

function revealStyle(visible: boolean) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  } as const;
}

/* ------------------------------------------------------------------ */
/*  Feature icons (minimal SVGs)                                       */
/* ------------------------------------------------------------------ */

function FeatureIcon({ type }: { type: string }) {
  const cls = 'w-8 h-8 text-brand-text-primary/40 group-hover:text-brand-orange transition-colors';

  switch (type) {
    case 'response':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'sound':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 'bluetooth':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
        </svg>
      );
    case 'recording':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case 'shells':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      );
    case 'power':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Module specs helper                                                */
/* ------------------------------------------------------------------ */

function getModuleSpecs(module: Product['module']) {
  if (module === 'F50') {
    return [
      { name: 'Display', value: '4.3" Color Touch LCD' },
      { name: 'Kits', value: '80 Factory + 100 User' },
      { name: 'Sounds', value: '937' },
      { name: 'Tracks', value: '60 Play-Along' },
      { name: 'Connectivity', value: 'USB-C, Bluetooth, OTG' },
    ];
  }
  return [
    { name: 'Display', value: '2.8" Color LCD' },
    { name: 'Kits', value: '40 Factory + 50 User' },
    { name: 'Sounds', value: '184' },
    { name: 'Tracks', value: '30 Play-Along' },
    { name: 'Connectivity', value: 'USB-C, Bluetooth, OTG' },
  ];
}

/* ------------------------------------------------------------------ */
/*  Section header helper                                              */
/* ------------------------------------------------------------------ */

function SectionHeader({ label, headline }: { label: string; headline: string }) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
        {label}
      </span>
      <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold text-brand-text-primary md:text-4xl lg:text-5xl">
        {headline}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const { lang, model } = useParams<{ lang: string; model: string }>();
  const currentLang = lang ?? 'en';

  const product = model ? getProductBySlug(model) : undefined;

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [model]);

  // Scroll reveal refs
  const { ref: finishRef, isVisible: finishVisible } = useScrollReveal();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollReveal();
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollReveal();
  const { ref: soundRef, isVisible: soundVisible } = useScrollReveal();
  const { ref: moduleRef, isVisible: moduleVisible } = useScrollReveal();
  const { ref: specRef, isVisible: specVisible } = useScrollReveal();
  const { ref: boxRef, isVisible: boxVisible } = useScrollReveal();
  const { ref: compareRef, isVisible: compareVisible } = useScrollReveal();
  const { ref: relatedRef, isVisible: relatedVisible } = useScrollReveal();

  /* ---------- Not found ---------- */
  if (!product) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-brand-text-primary">
            Product not found
          </h1>
          <p className="mt-4 font-body text-brand-text-secondary">
            The model you are looking for does not exist.
          </p>
          <Link
            to={`/${currentLang}/line`}
            className="mt-8 inline-block rounded-md bg-brand-orange px-8 py-4 font-display font-semibold text-white transition-colors hover:bg-brand-orange-hover"
          >
            View All Models
          </Link>
        </div>
      </section>
    );
  }

  /* ---------- Data ---------- */
  const adjacent = getAdjacentProducts(product);
  const adjacentList = [adjacent.prev, adjacent.next].filter(
    (p): p is Product => p !== null,
  );

  const features = [
    {
      icon: 'response',
      title: 'Expressive Response',
      desc: 'Multi-zone mesh heads with natural feel and dynamic sensitivity across every pad.',
    },
    {
      icon: 'sound',
      title: `${product.module === 'F50' ? '937' : '184'} Onboard Sounds`,
      desc: 'Factory and user kits covering every genre — from jazz brushes to stadium rock.',
    },
    {
      icon: 'bluetooth',
      title: 'Bluetooth Ready',
      desc: 'Stream audio and MIDI wirelessly to your favorite apps, DAW, or headphones.',
    },
    {
      icon: 'recording',
      title: 'Direct Recording',
      desc: 'Connect via OTG to record directly to your phone. No computer needed.',
    },
    {
      icon: 'shells',
      title: 'Wood-Shell Aesthetics',
      desc: 'Real wood grain finishes that look as good on stage as they do in your room.',
    },
    {
      icon: 'power',
      title: 'USB-C Powered',
      desc: 'Power via USB-C adapter or any power bank. Practice anywhere, anytime.',
    },
  ];

  const moduleSpecs = getModuleSpecs(product.module);

  /* ---------- Render ---------- */
  return (
    <>
      <SEO
        title={`${product.name} | E-Force Electronic Drums`}
        description={product.description}
        image={product.heroImage}
        lang={currentLang}
        path={`kits/${product.slug}`}
      />

      {/* ====================================================== */}
      {/* 1. HERO — Cinematic full-viewport                       */}
      {/* ====================================================== */}
      <section className="relative flex min-h-screen items-center bg-white overflow-hidden">
        {/* Radial spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,74,28,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-12 pt-32 text-center md:pt-40">
          {/* Badge */}
          {product.badge && (
            <motion.span
              {...fadeUp(0.1)}
              className="mb-6 inline-block rounded-full border border-brand-orange/20 bg-brand-orange/10 px-4 py-1.5 font-display text-xs font-semibold text-brand-orange"
            >
              {product.badge}
            </motion.span>
          )}

          {/* Product name */}
          <motion.h1
            {...fadeUp(0.2)}
            className="font-display text-5xl font-bold tracking-tight text-brand-text-primary md:text-7xl lg:text-8xl"
          >
            {product.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.4)}
            className="mt-4 font-display text-xl font-light text-brand-text-secondary md:text-2xl"
          >
            {product.tagline}
          </motion.p>

          {/* Price */}
          <motion.span
            {...fadeUp(0.5)}
            className="mt-6 font-mono text-lg text-brand-text-secondary/60"
          >
            {t('line.from')} {product.price}
          </motion.span>

          {/* Module badge */}
          <motion.span
            {...fadeUp(0.55)}
            className="mt-4 inline-block rounded-md border border-brand-border bg-[#f7f7f7] px-3 py-1 font-mono text-sm text-brand-text-secondary"
          >
            {product.module} Module
          </motion.span>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.65)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to={`/${currentLang}/dealers`}
              className="rounded-md bg-brand-orange px-8 py-4 font-display font-semibold text-white transition-colors duration-300 hover:bg-brand-orange-hover"
            >
              {t('product.findDealer')}
            </Link>
            <button
              type="button"
              className="rounded-md border border-brand-border px-8 py-4 font-display font-semibold text-brand-text-primary transition-colors duration-300 hover:border-brand-text-secondary"
            >
              {t('product.downloadSpecs')}
            </button>
          </motion.div>

          {/* Hero product image */}
          <motion.div
            {...fadeUp(0.8)}
            className="mx-auto mt-12 max-w-3xl"
          >
            <img
              src={product.heroImage}
              alt={product.name}
              className="w-full object-contain transition-transform duration-700 ease-out hover:-translate-y-2"
            />
          </motion.div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 2. FINISH SELECTOR                                      */}
      {/* ====================================================== */}
      <section className="bg-[#f7f7f7] py-24">
        <div ref={finishRef} style={revealStyle(finishVisible)}>
          <SectionHeader
            label="DESIGN"
            headline={t('finishes.headline')}
          />
          <FinishSelector product={product} />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 3. KEY FEATURES                                         */}
      {/* ====================================================== */}
      <section className="bg-white py-24">
        <div
          ref={featuresRef}
          className="mx-auto max-w-7xl px-6"
          style={revealStyle(featuresVisible)}
        >
          <SectionHeader
            label="FEATURES"
            headline={t('product.keyFeatures')}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.icon}
                className="group rounded-xl border border-brand-border bg-[#f7f7f7] p-7 transition-colors duration-500 hover:border-brand-orange/30"
              >
                <FeatureIcon type={f.icon} />
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-text-primary">
                  {f.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-text-secondary">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 4. GALLERY                                              */}
      {/* ====================================================== */}
      <section className="bg-[#f7f7f7] py-24">
        <div ref={galleryRef} style={revealStyle(galleryVisible)}>
          <SectionHeader
            label="GALLERY"
            headline={t('product.gallery')}
          />
          <ProductGallery product={product} />
        </div>
      </section>

      {/* ====================================================== */}
      {/* 5. SOUND DEMO                                           */}
      {/* ====================================================== */}
      <section className="bg-white py-24">
        <div
          ref={soundRef}
          className="mx-auto max-w-4xl px-6 text-center"
          style={revealStyle(soundVisible)}
        >
          <h2 className="font-display text-2xl font-bold text-brand-text-primary md:text-3xl">
            {t('product.soundDemo')}
          </h2>

          <div className="mt-10 rounded-2xl bg-white p-8">
            {/* Play button */}
            <button
              type="button"
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange transition-transform duration-300 hover:scale-105"
              aria-label="Play sound demo"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
              >
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </button>

            {/* Waveform placeholder */}
            <div className="relative mx-auto mt-6 h-1 w-full overflow-hidden rounded-full bg-brand-border">
              <div
                className="absolute inset-y-0 left-0 w-1/3 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,74,28,0.6), rgba(255,74,28,0.1))',
                }}
              />
            </div>

            <p className="mt-4 text-sm text-brand-text-secondary">
              Sound demo coming soon
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 6. MODULE                                               */}
      {/* ====================================================== */}
      <section className="bg-white py-24">
        <div
          ref={moduleRef}
          className="mx-auto max-w-7xl px-6"
          style={revealStyle(moduleVisible)}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            MODULE
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            {product.module} Module
          </h2>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left — placeholder module image */}
            <div className="flex aspect-square items-center justify-center rounded-xl bg-[#1a1a1a]">
              <span className="font-display text-6xl font-bold text-brand-orange/20">
                {product.module}
              </span>
            </div>

            {/* Right — module specs */}
            <div>
              {moduleSpecs.map((spec) => (
                <div
                  key={spec.name}
                  className="flex justify-between border-b border-white/10 py-3"
                >
                  <span className="font-body text-white/60">
                    {spec.name}
                  </span>
                  <span className="text-right font-mono text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 7. FULL SPEC TABLE                                      */}
      {/* ====================================================== */}
      <section className="bg-white py-24">
        <div
          ref={specRef}
          className="mx-auto max-w-5xl px-6"
          style={revealStyle(specVisible)}
        >
          <SectionHeader
            label="SPECIFICATIONS"
            headline={t('product.fullSpecs')}
          />
          <div className="mt-12">
            <SpecTable product={product} />
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 8. IN THE BOX                                           */}
      {/* ====================================================== */}
      <section className="bg-[#f7f7f7] py-24">
        <div
          ref={boxRef}
          className="mx-auto max-w-5xl px-6"
          style={revealStyle(boxVisible)}
        >
          <SectionHeader
            label="INCLUDED"
            headline={t('product.whatsInTheBox')}
          />
          <div className="mt-12">
            <InTheBox product={product} />
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 9. COMPARE                                              */}
      {/* ====================================================== */}
      <section className="bg-white py-24">
        <div
          ref={compareRef}
          className="mx-auto max-w-5xl px-6"
          style={revealStyle(compareVisible)}
        >
          <SectionHeader
            label="COMPARE"
            headline={t('product.compare')}
          />
          <div className="mt-12">
            <CompareModels product={product} />
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 10. RELATED MODELS                                      */}
      {/* ====================================================== */}
      <section className="bg-[#f7f7f7] py-24">
        <div
          ref={relatedRef}
          className="mx-auto max-w-7xl px-6 text-center"
          style={revealStyle(relatedVisible)}
        >
          <h2 className="font-display text-3xl font-bold text-brand-text-primary md:text-4xl">
            {t('product.relatedModels')}
          </h2>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {adjacentList.map((related) => (
              <Link
                key={related.id}
                to={`/${currentLang}/kits/${related.slug}`}
                className="group"
              >
                <article className="overflow-hidden rounded-xl border border-brand-border bg-[#f7f7f7] transition-all duration-500 hover:border-brand-orange/30">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={related.heroImage}
                      alt={related.name}
                      className="h-full w-full object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    {related.badge && (
                      <span className="absolute right-4 top-4 rounded-full bg-brand-orange px-3 py-1 font-display text-xs font-semibold text-white">
                        {related.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-brand-text-primary">
                          {related.name}
                        </h3>
                        <p className="mt-1 font-body text-sm text-brand-text-secondary">
                          {related.tagline}
                        </p>
                      </div>
                      <span className="rounded-md bg-[#f7f7f7] px-2.5 py-1 font-mono text-xs text-brand-text-secondary">
                        {related.module}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-mono text-sm text-brand-text-secondary">
                        {t('line.from')} {related.price}
                      </span>
                      <span className="font-display text-sm font-semibold text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {t('line.viewKit')} &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
