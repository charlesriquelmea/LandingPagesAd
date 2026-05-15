'use client';

import { Product } from "@/interfaces";
import { ProductGridItem } from "./product-grid/ProductGridItem";
import { useMemo, useRef } from "react";
import Link from "next/link";

const HorizontalScrollRow = ({ section, products }: { section: string; products: Product[] }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const cardWidth = 180;
    const gap = 10;
    const amount = (cardWidth + gap) * 2;
    rowRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const slug = section.toLowerCase();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <Link
          href={`/subcategoria/${encodeURIComponent(slug)}`}
          className="text-lg font-bold text-gray-900 hover:text-accent transition-colors"
        >
          {section}
        </Link>
        <Link
          href={`/subcategoria/${encodeURIComponent(slug)}`}
          className="text-sm font-medium text-accent hover:text-red-700 transition-colors"
        >
          Ver todos →
        </Link>
      </div>

      <div className="relative group">
        <div
          ref={rowRef}
          className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 px-10"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product) => (
            <div key={product.nombre} className="flex-shrink-0 w-[160px] sm:w-[180px]" style={{ scrollSnapAlign: 'start' }}>
              <ProductGridItem product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors text-gray-600 text-xl font-bold opacity-0 group-hover:opacity-100"
          aria-label="Anterior"
        >
          ‹
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition-colors text-gray-600 text-xl font-bold opacity-0 group-hover:opacity-100"
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>
    </div>
  );
};

interface FilteredProductsProps {
  products: Product[];
}

export const FilteredProducts: React.FC<FilteredProductsProps> = ({ products }) => {
  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {};
    for (const p of products) {
      const key = p.subcategoria || 'Otros';
      if (!map[key]) map[key] = [];
      map[key].push(p);
    }
    return map;
  }, [products]);

  const sectionKeys = Object.keys(grouped);

  if (sectionKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-lg font-medium">No hay productos en esta categoría</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {sectionKeys.map((section) => (
        <HorizontalScrollRow
          key={section}
          section={section}
          products={grouped[section]}
        />
      ))}
    </div>
  );
};
