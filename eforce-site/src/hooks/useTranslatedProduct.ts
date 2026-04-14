import { useTranslation } from "react-i18next";
import type { Product } from "@/data/products";
import { productTranslations } from "@/data/products-translations";

export function getTranslatedProduct(product: Product, lang: string): Product {
  const t = productTranslations[lang]?.[product.id];
  if (!t) return product;

  return {
    ...product,
    tagline: t.tagline ?? product.tagline,
    description: t.description ?? product.description,
    editorialHeadline: t.editorialHeadline ?? product.editorialHeadline,
    editorialBody: t.editorialBody ?? product.editorialBody,
    highlights: t.highlights
      ? product.highlights.map((h, i) => ({
          ...h,
          title: t.highlights![i]?.title ?? h.title,
          description: t.highlights![i]?.description ?? h.description,
        }))
      : product.highlights,
  };
}

export function useTranslatedProduct(product: Product | undefined): Product | undefined {
  const { i18n } = useTranslation();
  if (!product) return undefined;
  return getTranslatedProduct(product, i18n.language);
}
