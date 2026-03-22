import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { getProductBySlug } from "@/data/products";
import { StickyContextBar } from "@/components/product/StickyContextBar";
import { ProductHero } from "@/components/product/ProductHero";
import { KeySpecs } from "@/components/product/KeySpecs";
import { EditorialIntro } from "@/components/product/EditorialIntro";
import { HighlightsGrid } from "@/components/product/HighlightsGrid";
import { SoundDemo } from "@/components/product/SoundDemo";
import { TechTabs } from "@/components/product/TechTabs";
import { ModelSwitcher } from "@/components/product/ModelSwitcher";
import FinishSelector from "@/components/product/FinishSelector";
import CompareModels from "@/components/product/CompareModels";
import InTheBox from "@/components/product/InTheBox";

export default function ProductDetailPage() {
  const { model, lang } = useParams();
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const product = getProductBySlug(model || "");

  if (!product) {
    return <Navigate to={`/${lang}/line`} replace />;
  }

  return (
    <>
      <SEO
        title={`${product.name} | E-Force`}
        description={product.description}
        image={product.heroImage}
        lang={lang ?? "en"}
        path={`/kits/${product.slug}`}
      />

      <div className="bg-brand-black min-h-screen">
        <StickyContextBar
          product={product}
          onSwitchModel={() => setSwitcherOpen(true)}
        />

        <ProductHero product={product} />

        <KeySpecs product={product} />

        <EditorialIntro product={product} />

        <HighlightsGrid product={product} />

        <SoundDemo product={product} />

        <TechTabs product={product} />

        {/* Finish selector */}
        {product.finishes.length > 0 && (
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <FinishSelector product={product} />
            </div>
          </section>
        )}

        {/* In the box */}
        {product.inTheBox.length > 0 && (
          <section className="py-24 px-6 bg-neutral-950">
            <div className="max-w-5xl mx-auto">
              <InTheBox product={product} />
            </div>
          </section>
        )}

        {/* Compare models */}
        <section className="py-24 px-6" id="dealers">
          <div className="max-w-7xl mx-auto">
            <CompareModels currentProduct={product} />
          </div>
        </section>
      </div>

      <ModelSwitcher
        isOpen={switcherOpen}
        onClose={() => setSwitcherOpen(false)}
        currentProduct={product}
      />
    </>
  );
}
