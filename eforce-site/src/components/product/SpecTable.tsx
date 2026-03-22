import { useState } from 'react';
import type { Product } from '@/data/products';

interface Spec {
  name: string;
  value: string;
}

interface SpecCategory {
  category: string;
  specs: Spec[];
}

interface SpecTableProps {
  product: Product;
}

function getSpecs(product: Product): SpecCategory[] {
  const isF50 = product.module === 'F50';
  return [
    {
      category: 'Module',
      specs: [
        { name: 'Model', value: product.module },
        {
          name: 'Display',
          value: isF50 ? '4.3" Color Touch LCD' : '2.8" Color LCD',
        },
        { name: 'Factory Kits', value: isF50 ? '80' : '40' },
        { name: 'User Kits', value: isF50 ? '100' : '50' },
        { name: 'Sounds', value: isF50 ? '937' : '184' },
        { name: 'Play-Along Tracks', value: isF50 ? '60' : '30' },
      ],
    },
    {
      category: 'Connectivity',
      specs: [
        { name: 'USB', value: 'USB-C (MIDI & Audio)' },
        { name: 'Bluetooth', value: 'MIDI & Audio' },
        { name: 'OTG Recording', value: 'Yes' },
        { name: 'Headphone Out', value: '1/4" Stereo' },
        { name: 'Aux In', value: '1/8" Stereo' },
        {
          name: 'Main Out',
          value: isF50 ? '2x 1/4" TRS (L/R)' : '1x 1/4" Stereo',
        },
      ],
    },
    {
      category: 'Power',
      specs: [
        { name: 'Power Supply', value: 'USB-C (5V/2A)' },
        { name: 'Power Bank Compatible', value: 'Yes' },
      ],
    },
  ];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function SpecTable({ product }: SpecTableProps) {
  const specs = getSpecs(product);
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set([specs[0].category]),
  );

  function toggleCategory(category: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-6">
      {/* Desktop table */}
      <table className="hidden w-full border-collapse md:table">
        <tbody>
          {specs.map((cat) => (
            <DesktopCategory key={cat.category} category={cat} />
          ))}
        </tbody>
      </table>

      {/* Mobile accordion */}
      <div className="space-y-2 md:hidden">
        {specs.map((cat) => {
          const isOpen = openCategories.has(cat.category);
          return (
            <div key={cat.category}>
              <button
                onClick={() => toggleCategory(cat.category)}
                className="flex w-full items-center justify-between bg-[#f7f7f7] px-4 py-3 text-left font-display text-sm font-semibold uppercase tracking-wide text-brand-text-primary"
              >
                {cat.category}
                <ChevronIcon open={isOpen} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {cat.specs.map((spec) => (
                  <div
                    key={spec.name}
                    className="flex border-b border-brand-border"
                  >
                    <span className="w-1/2 px-4 py-3 font-body text-sm text-brand-text-secondary">
                      {spec.name}
                    </span>
                    <span className="w-1/2 px-4 py-3 font-mono text-sm text-brand-text-primary">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopCategory({ category }: { category: SpecCategory }) {
  return (
    <>
      <tr>
        <td
          colSpan={2}
          className="bg-[#f7f7f7] px-4 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white"
        >
          {category.category}
        </td>
      </tr>
      {category.specs.map((spec) => (
        <tr key={spec.name} className="border-b border-brand-border">
          <td className="w-1/2 px-4 py-3 font-body text-sm text-brand-text-secondary">
            {spec.name}
          </td>
          <td className="px-4 py-3 font-mono text-sm text-brand-text-primary">
            {spec.value}
          </td>
        </tr>
      ))}
    </>
  );
}
