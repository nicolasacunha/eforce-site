import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";

interface TechTabsProps { product: Product; }

export function TechTabs({ product }: TechTabsProps) {
  const tabs = product.techTabs || [];
  const [activeTab, setActiveTab] = useState(0);
  if (tabs.length === 0) return null;
  const currentTab = tabs[activeTab];

  return (
    <section className="bg-[#111]" style={{ padding: "clamp(6rem, 15vh, 12rem) clamp(1.5rem, 6vw, 6rem)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-8 border-b border-[rgba(255,255,255,0.08)] mb-8">
          {tabs.map((tab, i) => (
            <button key={tab.label} onClick={() => setActiveTab(i)} className={`pb-3 text-sm transition-colors ${i === activeTab ? "text-white border-b-2 border-brand-orange" : "text-[rgba(255,255,255,0.5)] hover:text-white"}`}>{tab.label}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} className="flex gap-6 overflow-x-auto pb-4 snap-x" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {currentTab.slides.map((slide) => (
              <div key={slide.title} className="min-w-[280px] max-w-[320px] flex-shrink-0 snap-start">
                {slide.image && (<img src={slide.image} alt={slide.title} className="w-full h-40 object-cover rounded-lg mb-3" />)}
                <h4 className="text-white font-semibold text-sm mb-1">{slide.title}</h4>
                <p className="text-[rgba(255,255,255,0.5)] text-xs">{slide.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
