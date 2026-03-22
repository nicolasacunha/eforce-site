import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface SoundDemoProps { product: Product; }

export function SoundDemo({ product }: SoundDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();
  if (!product.soundDemo) return null;

  const handleStart = useCallback(() => {
    if (!audioRef.current) { audioRef.current = new Audio(product.soundDemo); audioRef.current.loop = true; }
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, [product.soundDemo]);

  const handleStop = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setIsPlaying(false);
  }, []);

  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-neutral-500 text-sm mb-8">O som não é apenas bom. Ele proporciona uma experiência emocionante.</p>
        <button onMouseDown={handleStart} onMouseUp={handleStop} onMouseLeave={handleStop} onTouchStart={handleStart} onTouchEnd={handleStop} className="relative w-24 h-24 rounded-full border-2 border-neutral-700 hover:border-brand-orange transition-colors mx-auto flex items-center justify-center group" aria-label="Segure para ouvir">
          <motion.div className="absolute inset-0 rounded-full border-2 border-brand-orange" animate={isPlaying ? { scale: [1, 1.3, 1], opacity: [1, 0, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }} />
          <span className="text-neutral-400 group-hover:text-white transition-colors text-xs text-center leading-tight">{isPlaying ? t("product.listening") : t("product.holdToListen")}</span>
        </button>
        <p className="text-neutral-600 text-xs mt-4">{product.name}</p>
      </div>
    </section>
  );
}
