import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ModelFilterSidebarProps {
  activeFamily: string;
  onFamilyChange: (family: string) => void;
  activeModule: string;
  onModuleChange: (module: string) => void;
  activePriceRange: string;
  onPriceRangeChange: (range: string) => void;
}

const families = [
  { key: "all", label: "Todos", count: 7 },
  { key: "ef2", label: "EF2", count: 4 },
  { key: "hybrid", label: "Híbrido", count: 2 },
  { key: "pro", label: "Pro", count: 1 },
];

export function ModelFilterSidebar({
  activeFamily,
  onFamilyChange,
  activeModule,
  onModuleChange,
  activePriceRange,
  onPriceRangeChange,
}: ModelFilterSidebarProps) {
  const [moduleOpen, setModuleOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <h1 className="text-xl font-bold text-white mb-6">
        {t("line.title")}
      </h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {families.map((f) => (
          <button
            key={f.key}
            onClick={() => onFamilyChange(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeFamily === f.key
                ? "bg-brand-orange text-white"
                : "bg-[#1a1a1a] text-[rgba(255,255,255,0.5)] hover:text-white"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>
      <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
        <button
          onClick={() => setModuleOpen(!moduleOpen)}
          className="w-full flex justify-between items-center py-3 text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
        >
          <span>{t("line.module") || "Módulo"}</span>
          <span>{moduleOpen ? "−" : "+"}</span>
        </button>
        {moduleOpen && (
          <div className="flex gap-2 pb-4">
            {["all", "F10", "F50"].map((m) => (
              <button
                key={m}
                onClick={() => onModuleChange(m)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeModule === m
                    ? "bg-brand-orange text-white"
                    : "bg-[#1a1a1a] text-[rgba(255,255,255,0.5)] hover:text-white"
                }`}
              >
                {m === "all" ? t("line.all") || "Todos" : m}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="w-full flex justify-between items-center py-3 text-sm text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
        >
          <span>{t("line.priceRange") || "Faixa de Preço"}</span>
          <span>{priceOpen ? "−" : "+"}</span>
        </button>
        {priceOpen && (
          <div className="flex flex-wrap gap-2 pb-4">
            {(["all", "under5k", "5k-10k", "over10k"] as const).map((r) => {
              const labels: Record<string, string> = {
                all: t("line.all") || "Todos",
                under5k: "< R$ 5k",
                "5k-10k": "R$ 5k - 10k",
                over10k: "> R$ 10k",
              };
              return (
                <button
                  key={r}
                  onClick={() => onPriceRangeChange(r)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    activePriceRange === r
                      ? "bg-brand-orange text-white"
                      : "bg-[#1a1a1a] text-[rgba(255,255,255,0.5)] hover:text-white"
                  }`}
                >
                  {labels[r]}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={() => {
          onFamilyChange("all");
          onModuleChange("all");
          onPriceRangeChange("all");
        }}
        className="text-xs text-[rgba(255,255,255,0.25)] hover:text-[rgba(255,255,255,0.5)] transition-colors mt-4"
      >
        {t("line.resetFilters")}
      </button>
    </aside>
  );
}
