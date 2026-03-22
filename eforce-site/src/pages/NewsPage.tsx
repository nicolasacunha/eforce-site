import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/layout/SEO';

const newsItems = [
  {
    id: 1,
    date: '2025-03-10',
    category: 'Product Launch',
    title: 'Introducing the EF7 Eye Hybrid — The Definitive E-Force Experience',
    excerpt: 'Our flagship model combines real Odery acoustic shells with cutting-edge electronic technology. Available now through authorized dealers worldwide.',
    featured: true,
  },
  {
    id: 2,
    date: '2025-02-20',
    category: 'Technology',
    title: 'F50 Module Firmware v3.0 — 200 New Sounds and Enhanced Bluetooth',
    excerpt: 'The latest firmware update brings 200 additional sounds, improved Bluetooth latency, and a new metronome engine to the F50 module.',
    featured: false,
  },
  {
    id: 3,
    date: '2025-01-15',
    category: 'Events',
    title: 'E-Force at NAMM 2025 — A First Look',
    excerpt: 'Join us at the NAMM Show in Anaheim, CA. Experience the full E-Force lineup, meet the team, and see exclusive new finish options.',
    featured: false,
  },
  {
    id: 4,
    date: '2024-12-01',
    category: 'Partnership',
    title: 'E-Force Expands to European Market with New Distribution Partners',
    excerpt: 'We are thrilled to announce new distribution agreements covering Italy, Germany, Spain, and the United Kingdom.',
    featured: false,
  },
  {
    id: 5,
    date: '2024-11-10',
    category: 'Artist',
    title: 'Session Drummer Carlos Mendes Joins the E-Force Family',
    excerpt: 'Renowned Brazilian session drummer Carlos Mendes has chosen the EF5 V2 as his go-to electronic kit for studio work and live performances.',
    featured: false,
  },
  {
    id: 6,
    date: '2024-10-05',
    category: 'Product',
    title: 'New Finish Options for the EF2 V2 — Deep Violet and Walnut Brown',
    excerpt: 'Two stunning new finish options are now available for our best-selling model. Exclusive to E-Force — no other e-drum brand offers this.',
    featured: false,
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function NewsPage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal(0.05);

  const currentLang = lang ?? 'en';
  const featured = newsItems.find((n) => n.featured);
  const rest = newsItems.filter((n) => !n.featured);

  return (
    <>
      <SEO
        title={`${t('nav.news')} | E-Force`}
        description="Latest news, product launches, and updates from E-Force Electronic Drums."
        lang={currentLang}
        path="news"
      />

      {/* Hero */}
      <section className="bg-white pt-32 pb-16 md:pt-40">
        <div
          ref={heroRef}
          className="mx-auto max-w-4xl px-6 text-center"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            {t('nav.news').toUpperCase()}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-brand-text-primary md:text-6xl">
            Latest from E-Force
          </h1>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="bg-white pb-8">
          <div className="mx-auto max-w-5xl px-6">
            <article className="group overflow-hidden rounded-2xl border border-brand-border bg-[#f7f7f7] transition-colors hover:border-brand-orange/30">
              {/* Placeholder image area */}
              <div className="aspect-[21/9] bg-gradient-to-br from-brand-surface via-brand-surface-2 to-brand-surface" />
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-brand-orange/10 px-3 py-1 font-display text-xs font-semibold text-brand-orange">
                    {featured.category}
                  </span>
                  <span className="font-mono text-xs text-brand-text-secondary">
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-brand-text-primary md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 max-w-3xl font-body leading-relaxed text-brand-text-secondary">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-block font-display text-sm font-semibold text-brand-orange transition-colors group-hover:text-brand-orange-hover">
                  Read more →
                </span>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* News grid */}
      <section className="bg-white py-16 pb-24">
        <div
          ref={gridRef}
          className="mx-auto max-w-5xl px-6"
          style={{
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-xl border border-brand-border bg-[#f7f7f7] transition-colors hover:border-brand-orange/30"
              >
                {/* Placeholder image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-surface via-brand-surface-2 to-brand-surface" />
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-display text-xs text-brand-text-secondary">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-brand-text-secondary/60">
                      {formatDate(item.date)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold leading-snug text-brand-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm text-brand-text-secondary">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 inline-block font-display text-sm text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Read more →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#f7f7f7] py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-text-primary">Stay in the loop</h2>
          <p className="mt-3 font-body text-brand-text-secondary">
            Subscribe to get the latest E-Force news, product launches, and exclusive updates.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-lg border border-brand-border bg-[#f7f7f7] px-4 py-3 font-body text-sm text-brand-text-primary placeholder:text-brand-text-secondary/50 focus:border-brand-orange/50 focus:outline-none focus:ring-1 focus:ring-brand-orange/50"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-orange px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-brand-orange-hover"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
