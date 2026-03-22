import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { products } from '@/data/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const ef2v2 = products.find((p) => p.id === 'ef2v2')!;
const ef5v2 = products.find((p) => p.id === 'ef5v2')!;
const ef7eye = products.find((p) => p.id === 'ef7eye')!;

/* ─── Spec number — Porsche "2.3s" style ────────────────────── */

function SpecNumber({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="font-display"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          color: '#0a0a0a',
        }}
      >
        {value}
      </span>
      <span
        className="mt-3"
        style={{
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'rgba(0,0,0,0.2)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Full-viewport product moment — vertical layout ─────────── */

interface MomentProps {
  product: typeof ef2v2;
  badge: string;
  imageSrc: string;
  specs: { value: string; label: string }[];
}

function ProductMoment({ product, badge, imageSrc, specs }: MomentProps) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const reveal = useScrollReveal(0.05);

  return (
    <div
      style={{
        backgroundColor: '#f0f0ee',
        padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 4vw, 4rem) clamp(4rem, 8vh, 8rem)',
      }}
    >
      <div
        ref={reveal.ref}
        className="mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: '1400px',
          opacity: reveal.isVisible ? 1 : 0,
          transform: reveal.isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Badge + Name + Tagline — compact header */}
        <span
          className="inline-block rounded-full px-4 py-1.5"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#ff4a1c',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {badge}
        </span>

        <h2
          className="font-display mt-5"
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            fontWeight: 700,
            color: '#0a0a0a',
          }}
        >
          {product.name}
        </h2>

        <p
          className="mt-4"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight: 300,
            color: 'rgba(0,0,0,0.4)',
          }}
        >
          {product.tagline}
        </p>

        {/* PRODUCT IMAGE — dominates the viewport */}
        <div
          className="w-full flex justify-center"
          style={{ marginTop: 'clamp(2rem, 5vh, 4rem)' }}
        >
          <img
            src={imageSrc}
            alt={product.name}
            className="product-image"
            style={{
              width: 'min(90vw, 1200px)',
              maxHeight: '60vh',
              objectFit: 'contain',
            }}
            loading="lazy"
          />
        </div>

        {/* Specs strip — Porsche style numbers */}
        <div
          className="flex justify-center gap-12 md:gap-20"
          style={{ marginTop: 'clamp(2rem, 4vh, 4rem)' }}
        >
          {specs.map((s) => (
            <SpecNumber key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center gap-8 mt-8"
        >
          <span
            className="font-mono"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
              color: 'rgba(0,0,0,0.4)',
            }}
          >
            {t('line.from')} {product.price}
          </span>

          <Link
            to={`/${lang}/kits/${product.slug}`}
            className="inline-flex items-center gap-2 group"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#ff4a1c',
            }}
          >
            {t('home.discover')}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export default function ProductShowcase() {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <section>
      <ProductMoment
        product={ef2v2}
        badge={t('home.bestSeller')}
        imageSrc="/assets/images/kits/ef2v2/ef2v2-front-blue.jpg"
        specs={[
          { value: '184', label: t('home.stats.sounds') },
          { value: 'F10', label: 'Module' },
          { value: '3', label: t('home.stats.finishesCount') },
        ]}
      />

      <div className="section-divider" />

      <ProductMoment
        product={ef5v2}
        badge={t('home.professional')}
        imageSrc="/assets/images/kits/ef5v2/ef5v2-front.jpg"
        specs={[
          { value: '937', label: t('home.stats.sounds') },
          { value: 'F50', label: 'Module' },
          { value: '3', label: t('home.stats.finishesCount') },
        ]}
      />

      <div className="section-divider" />

      <ProductMoment
        product={ef7eye}
        badge={t('home.flagship')}
        imageSrc="/assets/images/kits/ef7eye/ef7eye-hero.jpg"
        specs={[
          { value: '937', label: t('home.stats.sounds') },
          { value: 'F50', label: 'Module' },
          { value: '3', label: t('home.stats.finishesCount') },
        ]}
      />

      <div
        className="flex justify-center bg-white"
        style={{ padding: 'clamp(4rem, 10vh, 8rem) 0' }}
      >
        <Link
          to={`/${lang}/line`}
          className="inline-flex items-center gap-2 group"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#ff4a1c',
          }}
        >
          {t('home.seeFullLine')}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
