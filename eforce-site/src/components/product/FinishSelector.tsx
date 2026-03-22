import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, ProductFinish } from '@/data/products';

interface FinishSelectorProps {
  product: Product;
}

export default function FinishSelector({ product }: FinishSelectorProps) {
  const { t } = useTranslation();
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(
    product.finishes[0],
  );

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center gap-12 lg:flex-row">
        {/* Left — Image display */}
        <div className="lg:w-3/5">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedFinish.id}
                src={selectedFinish.image}
                alt={`${product.name} — ${selectedFinish.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-contain p-8"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right — Swatches & info */}
        <div className="lg:w-2/5">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-brand-orange">
            {t('product.finishLabel')}
          </span>

          {/* Swatches */}
          <div className="mt-8 flex gap-6">
            {product.finishes.map((finish) => (
              <button
                key={finish.id}
                onClick={() => setSelectedFinish(finish)}
                className="flex flex-col items-center"
                aria-label={finish.name}
              >
                <span
                  className={`block h-14 w-14 rounded-full transition-all duration-300 ${
                    selectedFinish.id === finish.id
                      ? 'ring-2 ring-brand-orange ring-offset-2 ring-offset-brand-surface'
                      : ''
                  }`}
                  style={{ backgroundColor: finish.color }}
                />
                <span
                  className={`mt-2 text-center font-display text-xs transition-colors duration-300 ${
                    selectedFinish.id === finish.id
                      ? 'text-brand-text-primary'
                      : 'text-brand-text-secondary'
                  }`}
                >
                  {finish.name}
                </span>
              </button>
            ))}
          </div>

          {/* Selected label */}
          <p className="mt-6 font-display text-sm text-brand-text-secondary">
            {t('finishes.selected')}:{' '}
            <span className="text-brand-text-primary">{selectedFinish.name}</span>
          </p>

          {/* Note */}
          <p className="mt-4 text-xs italic text-brand-text-secondary/60">
            {t('finishes.note')}
          </p>
        </div>
      </div>
    </div>
  );
}
