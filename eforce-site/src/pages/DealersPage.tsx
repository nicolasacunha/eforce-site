import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';

type Region = 'all' | 'South America' | 'Europe' | 'North America' | 'Asia';

interface Dealer {
  name: string;
  city: string;
  country: string;
  region: Region;
  type: 'Premium Dealer' | 'Authorized Dealer';
}

const dealers: Dealer[] = [
  { name: 'Musical Express', city: 'São Paulo', country: 'Brazil', region: 'South America', type: 'Premium Dealer' },
  { name: 'Drums & Co.', city: 'Curitiba', country: 'Brazil', region: 'South America', type: 'Authorized Dealer' },
  { name: 'Bateras Club', city: 'Rio de Janeiro', country: 'Brazil', region: 'South America', type: 'Authorized Dealer' },
  { name: 'Percussion World', city: 'Buenos Aires', country: 'Argentina', region: 'South America', type: 'Authorized Dealer' },
  { name: 'DrumShop Milano', city: 'Milan', country: 'Italy', region: 'Europe', type: 'Premium Dealer' },
  { name: 'London Drums', city: 'London', country: 'United Kingdom', region: 'Europe', type: 'Authorized Dealer' },
  { name: 'Schlagzeug Berlin', city: 'Berlin', country: 'Germany', region: 'Europe', type: 'Authorized Dealer' },
  { name: 'Madrid Percussion', city: 'Madrid', country: 'Spain', region: 'Europe', type: 'Authorized Dealer' },
  { name: 'Drum Center USA', city: 'Los Angeles', country: 'United States', region: 'North America', type: 'Authorized Dealer' },
  { name: 'Tokyo Drum Lab', city: 'Tokyo', country: 'Japan', region: 'Asia', type: 'Premium Dealer' },
  { name: 'Shanghai Music', city: 'Shanghai', country: 'China', region: 'Asia', type: 'Authorized Dealer' },
];

const regions: { key: Region; label: string }[] = [
  { key: 'all', label: 'All Regions' },
  { key: 'South America', label: 'South America' },
  { key: 'Europe', label: 'Europe' },
  { key: 'North America', label: 'North America' },
  { key: 'Asia', label: 'Asia' },
];

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function DealersPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [activeRegion, setActiveRegion] = useState<Region>('all');
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  const currentLang = lang ?? 'en';

  const filtered = activeRegion === 'all'
    ? dealers
    : dealers.filter((d) => d.region === activeRegion);

  return (
    <>
      <SEO
        title="Find a Dealer | E-Force"
        description="Explore, experience, and purchase E-Force electronic drums at an authorized dealer near you."
        lang={currentLang}
        path="dealers"
      />

      {/* SECTION 1 — Hero */}
      <section className="bg-white pt-32 pb-16 md:pt-40">
        <motion.div
          ref={heroRef}
          className="mx-auto max-w-4xl px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            DEALERS
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-brand-text-primary md:text-6xl">
            {t('nav.dealers')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-brand-text-secondary md:text-xl">
            Explore, experience, and purchase E-Force electronic drums at an authorized dealer near you.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2 — Region filter + Dealer list */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          {/* Region filter pills */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {regions.map((r) => (
              <button
                key={r.key}
                onClick={() => setActiveRegion(r.key)}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-medium transition-all duration-300 ${
                  activeRegion === r.key
                    ? 'bg-brand-orange text-white'
                    : 'border border-[rgba(0,0,0,0.08)] text-[rgba(0,0,0,0.5)] hover:border-brand-text-secondary hover:text-brand-text-primary'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Dealer grid */}
          <div
            ref={gridRef}
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((dealer) => (
                  <motion.div
                    key={dealer.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-brand-border bg-[#f7f7f7] p-6 transition-colors duration-300 hover:border-brand-orange/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-brand-text-primary">
                        {dealer.name}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 font-display text-xs ${
                          dealer.type === 'Premium Dealer'
                            ? 'bg-brand-orange/10 text-brand-orange'
                            : 'bg-white/5 text-brand-text-secondary'
                        }`}
                      >
                        {dealer.type}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-brand-text-secondary" />
                      <p className="font-body text-sm text-brand-text-secondary">
                        {dealer.city}, {dealer.country}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Map placeholder */}
      <section className="bg-[#f7f7f7] py-16">
        <div
          ref={mapRef}
          className="mx-auto max-w-5xl px-6"
          style={{
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-brand-border bg-[#f0f0f0]">
            <div className="text-center">
              <GlobeIcon className="mx-auto h-16 w-16 text-brand-text-secondary/20" />
              <p className="mt-4 font-body text-sm text-brand-text-secondary">
                Interactive map coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Become a dealer CTA */}
      <section className="bg-white py-24">
        <div
          ref={ctaRef}
          className="mx-auto max-w-2xl px-6 text-center"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <h2 className="font-display text-2xl font-bold text-white">
            Become an E-Force dealer
          </h2>
          <p className="mt-4 font-body text-base text-brand-text-secondary">
            Interested in distributing E-Force in your region? We&apos;d love to hear from you.
          </p>
          <Link
            to={`/${currentLang}/support`}
            className="mt-8 inline-block font-display text-sm font-semibold text-brand-orange transition-colors duration-300 hover:text-brand-orange-hover"
          >
            Get in touch &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
