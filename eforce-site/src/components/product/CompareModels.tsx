import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/data/products';
import { getAdjacentProducts } from '@/data/products';

interface CompareModelsProps {
  product: Product;
}

function ModelCard({
  model,
  isCurrent,
  lang,
}: {
  model: Product;
  isCurrent: boolean;
  lang: string;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-[#f7f7f7] ${
        isCurrent ? 'border-brand-orange/40' : 'border-brand-border'
      }`}
    >
      <div className="aspect-square overflow-hidden bg-white">
        <img
          src={model.heroImage}
          alt={model.name}
          className="h-full w-full object-contain p-6"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-brand-text-primary">
          {model.name}
        </h3>
        <p className="mt-1 font-body text-sm text-brand-text-secondary">
          {model.tagline}
        </p>
        <span className="mt-2 inline-block rounded bg-[#f7f7f7] px-2 py-0.5 font-mono text-xs text-brand-text-secondary">
          {model.module}
        </span>
        <p className="mt-3 font-mono text-sm text-brand-text-secondary">
          {model.price}
        </p>
        {isCurrent ? (
          <p className="mt-3 text-sm text-brand-orange">
            {t('product.currentModel', 'Current model')}
          </p>
        ) : (
          <Link
            to={`/${lang}/kits/${model.slug}`}
            className="mt-3 inline-block text-sm text-brand-orange transition-colors hover:text-brand-orange-hover"
          >
            {t('product.viewKit', 'View kit')} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

export default function CompareModels({ product }: CompareModelsProps) {
  const { lang } = useParams<{ lang: string }>();
  const { prev, next } = getAdjacentProducts(product);
  const resolvedLang = lang ?? 'en';

  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {prev ? (
          <ModelCard model={prev} isCurrent={false} lang={resolvedLang} />
        ) : (
          <div />
        )}
        <ModelCard
          model={product}
          isCurrent={true}
          lang={resolvedLang}
        />
        {next ? (
          <ModelCard model={next} isCurrent={false} lang={resolvedLang} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
