import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HoverVideoCard } from "@/components/ui/HoverVideoCard";
import type { Product } from "@/data/products";

interface ModelCardProps {
  product: Product;
}

export function ModelCard({ product }: ModelCardProps) {
  const { lang } = useParams();
  const { t } = useTranslation();

  const translateSpecLabel = (label: string) => {
    const map: Record<string, string> = {
      'sons': t('home.stats.sounds'),
      'kits\ncustomizáveis': t('home.stats.kits'),
      'kits customizáveis': t('home.stats.kits'),
      'tipos de reverb': t('home.stats.reverbs'),
      'tipos de\nreverb': t('home.stats.reverbs'),
      'módulo': t('home.stats.module'),
    };
    return map[label.toLowerCase()] ?? label;
  };

  return (
    <Link
      to={`/${lang}/kits/${product.slug}`}
      className="flex items-center gap-4 p-4 bg-[#111] rounded-lg border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] transition-colors group"
    >
      <HoverVideoCard
        image={product.heroImage}
        videoSrc={product.videoPreview}
        alt={product.name}
        className="w-32 h-16 md:w-40 md:h-20 rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold">{product.name}</h3>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-[rgba(255,255,255,0.5)]">
          <span>{product.module}</span>
          <span>&middot;</span>
          <span>{product.specsHighlight?.[0]?.value} {product.specsHighlight?.[0]?.label ? translateSpecLabel(product.specsHighlight[0].label) : ''}</span>
        </div>
      </div>
      <span className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity text-lg">
        &rarr;
      </span>
    </Link>
  );
}
