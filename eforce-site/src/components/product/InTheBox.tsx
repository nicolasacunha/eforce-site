import { useTranslation } from 'react-i18next';
import type { Product } from '@/data/products';

interface InTheBoxProps {
  product: Product;
}

function PackageIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto text-brand-text-secondary"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export default function InTheBox({ product }: InTheBoxProps) {
  const { t } = useTranslation();

  if (product.inTheBox.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-body text-sm text-brand-text-secondary">
          {t('product.detailsComingSoon', 'Details coming soon')}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {product.inTheBox.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-brand-border bg-[#f7f7f7] p-5 text-center"
          >
            <PackageIcon />
            {item.quantity > 1 && (
              <span className="mt-2 block font-mono text-xs text-brand-orange">
                &times;{item.quantity}
              </span>
            )}
            <p className="mt-3 font-body text-sm text-brand-text-secondary">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
