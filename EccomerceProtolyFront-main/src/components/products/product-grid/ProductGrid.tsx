'use client';

import { ProductGridItem } from "./ProductGridItem"
import { useEffect, useState, useMemo, useRef } from "react";
import useProductsStore from "@/store/products/products-store";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

const HorizontalScrollRow = ({ section, products }: { section: string; products: any[] }) => {
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

export const ProductGrid = () => {
    const getProducts = useProductsStore((state) => state.getProducts);
    const products = useProductsStore((state) => state.products);
    const loading = useProductsStore((state) => state.loading);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getProducts();
    }, [])

    const filtered = useMemo(() => {
      if (!search.trim()) return products;
      const q = search.toLowerCase();
      return products.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
      );
    }, [products, search]);

    const grouped = useMemo(() => {
      const map: Record<string, typeof filtered> = {};
      for (const p of filtered) {
        const key = p.subcategoria || 'Otros';
        if (!map[key]) map[key] = [];
        map[key].push(p);
      }
      return map;
    }, [filtered]);

    const sectionKeys = Object.keys(grouped);

    if (loading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 px-4 sm:px-8 max-w-7xl mx-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-5 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative mb-4 sm:hidden">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg font-medium">
              {search ? "Sin resultados para tu búsqueda" : "No hay productos disponibles"}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {sectionKeys.map((section) => (
              <HorizontalScrollRow
                key={section}
                section={section}
                products={grouped[section]}
              />
            ))}
          </div>
        )}
      </div>
    );
}
