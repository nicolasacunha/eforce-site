import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { products } from '@/data/products';
import type { ProductFinish } from '@/data/products';

const ef2v2 = products.find((p) => p.id === 'ef2v2')!;

export default function FinishShowcase() {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const [selected, setSelected] = useState<ProductFinish>(ef2v2.finishes[0]);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#f0f0ee',
        padding: 'clamp(6rem, 12vh, 10rem) 0',
      }}
    >
      <div
        className="mx-auto w-full flex flex-col items-center"
        style={{
          maxWidth: '1400px',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div className="text-center">
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: '#ff4a1c',
            }}
          >
            {t('home.identity')}
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#0a0a0a',
              marginTop: '1rem',
            }}
          >
            {t('finishes.headline')}
          </h2>
        </div>

        {/* MASSIVE product image with crossfade */}
        <div
          className="relative w-full flex justify-center"
          style={{
            marginTop: 'clamp(2rem, 5vh, 4rem)',
            minHeight: 'clamp(300px, 55vh, 700px)',
          }}
        >
          {/* Color glow behind product */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              width: '60%',
              height: '60%',
              backgroundColor: selected.color,
              opacity: 0.12,
              transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          <AnimatePresence mode="wait">
            <motion.img
              key={selected.id}
              src={selected.image}
              alt={`EF2 V2 — ${selected.name}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'min(90vw, 1100px)',
                maxHeight: '60vh',
                objectFit: 'contain',
              }}
            />
          </AnimatePresence>
        </div>

        {/* Finish name — updates with selection */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-display text-center"
            style={{
              marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              fontWeight: 600,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
            }}
          >
            {selected.name}
          </motion.p>
        </AnimatePresence>

        {/* Swatches — large, tactile */}
        <div
          className="flex justify-center items-center"
          style={{
            gap: 'clamp(1rem, 3vw, 2rem)',
            marginTop: 'clamp(1.5rem, 3vh, 2rem)',
          }}
        >
          {ef2v2.finishes.map((finish) => {
            const isActive = selected.id === finish.id;
            return (
              <button
                key={finish.id}
                onClick={() => setSelected(finish)}
                aria-label={`Select ${finish.name} finish`}
                style={{
                  width: 'clamp(36px, 5vw, 48px)',
                  height: 'clamp(36px, 5vw, 48px)',
                  borderRadius: '50%',
                  backgroundColor: finish.color,
                  border: 'none',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: isActive
                    ? `0 0 0 3px #f0f0ee, 0 0 0 5px #ff4a1c`
                    : `0 0 0 1px rgba(0,0,0,0.08)`,
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Note */}
        <p
          className="text-center"
          style={{
            marginTop: 'clamp(2rem, 4vh, 3rem)',
            fontSize: '11px',
            fontStyle: 'italic',
            color: 'rgba(0,0,0,0.25)',
          }}
        >
          {t('finishes.note')}
        </p>
      </div>
    </section>
  );
}
