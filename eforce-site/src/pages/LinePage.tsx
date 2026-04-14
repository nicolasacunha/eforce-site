import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { products } from "@/data/products";
import { ModelFilterSidebar } from "@/components/line/ModelFilterSidebar";
import { ModelCard } from "@/components/line/ModelCard";

type ProductGroup = { label: string; items: typeof products };

export default function LinePage() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang ?? "en";
  const [activeFamily, setActiveFamily] = useState("all");
  const [activeModule, setActiveModule] = useState("all");
  const [activePriceRange, setActivePriceRange] = useState("all");

  const getFamily = (p: typeof products[0]) => {
    if (p.priceValue <= 5000) return "entry";
    if (p.priceValue <= 10000) return "mid";
    return "premium";
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeFamily === "ef2" && !p.name.startsWith("EF2")) return false;
      if (activeFamily === "hybrid" && !p.name.toLowerCase().includes("hybrid") && !p.name.toLowerCase().includes("cafe")) return false;
      if (activeFamily === "pro" && p.module !== "F50") return false;
      if (activeModule !== "all" && p.module !== activeModule) return false;
      if (activePriceRange === "under5k" && p.priceValue >= 5000) return false;
      if (activePriceRange === "5k-10k" && (p.priceValue < 5000 || p.priceValue > 10000)) return false;
      if (activePriceRange === "over10k" && p.priceValue <= 10000) return false;
      return true;
    });
  }, [activeFamily, activeModule, activePriceRange]);

  const groups = useMemo<ProductGroup[]>(() => {
    const entry = filtered.filter((p) => getFamily(p) === "entry");
    const mid = filtered.filter((p) => getFamily(p) === "mid");
    const premium = filtered.filter((p) => getFamily(p) === "premium");

    const result: ProductGroup[] = [];
    if (entry.length) result.push({ label: t("line.entryLine"), items: entry });
    if (mid.length) result.push({ label: t("line.midLine"), items: mid });
    if (premium.length) result.push({ label: t("line.premiumLine"), items: premium });
    return result;
  }, [filtered, t]);

  return (
    <>
      <SEO title={t("seo.lineTitle")} description={t("seo.lineDescription")} lang={currentLang} path="/line" />
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <ModelFilterSidebar
            activeFamily={activeFamily}
            onFamilyChange={setActiveFamily}
            activeModule={activeModule}
            onModuleChange={setActiveModule}
            activePriceRange={activePriceRange}
            onPriceRangeChange={setActivePriceRange}
          />
          <main className="flex-1">
            {groups.map((group) => (
              <div key={group.label} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#ff4a1c" }}>
                    {group.label}
                  </h2>
                  <span className="text-xs text-brand-orange cursor-pointer hover:text-white transition-colors">
                    {t("line.compare")}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((product) => (
                    <ModelCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <p className="text-[rgba(255,255,255,0.5)] text-center py-16">
                {t("line.noResults")}
              </p>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
