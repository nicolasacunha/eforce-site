import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { products } from '@/data/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { usePageTransition } from '@/context/TransitionContext';

export default function ProductPreview() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const { ref, isVisible } = useScrollReveal(0.1);
  const { navigateWithCurtain } = usePageTransition();

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-brand-surface transition-opacity duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="px-6 mb-12">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-brand-orange">
            {t('nav.line').toUpperCase()}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
            {t('line.headline')}
          </h2>
        </div>

        {/* Horizontal scroll strip */}
        <div className="product-scroll-strip overflow-x-auto flex gap-6 px-6 pb-4 snap-x snap-mandatory">
          {products.map((product) => {
            const isHighlighted = product.id === 'ef2v2';

            return (
              <div
                key={product.id}
                onClick={() => navigateWithCurtain(`/${lang}/kits/${product.slug}`)}
                className={`group snap-center flex-shrink-0 w-72 md:w-80 bg-brand-black rounded-xl overflow-hidden border border-brand-border transition-shadow duration-500 cursor-pointer ${
                  isHighlighted ? 'ring-1 ring-brand-orange/30 shadow-lg shadow-brand-orange/5' : ''
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-brand-black">
                  <img
                    src={product.heroImage}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute top-4 right-4 bg-brand-orange text-white font-display text-xs font-semibold px-3 py-1 rounded-full">
                      {t(product.badge)}
                    </span>
                  )}
                </div>

                {/* Text content */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-white">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-brand-text-secondary mt-1">
                    {product.tagline}
                  </p>
                  <p className="font-mono text-sm text-brand-text-secondary mt-3">
                    {t('line.from')} {product.price}
                  </p>
                  <span className="inline-block mt-3 font-display text-sm text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t('line.viewKit')} &rarr;
                  </span>
                </div>
              </div>
            );
          })}

          {/* "See the full line" tail card */}
          <Link
            to={`/${lang}/line`}
            className="snap-center flex-shrink-0 w-72 flex items-center justify-center font-display text-brand-orange hover:text-brand-orange-hover transition-colors"
          >
            {t('line.viewKit')} &rarr;
          </Link>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .product-scroll-strip {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .product-scroll-strip::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
