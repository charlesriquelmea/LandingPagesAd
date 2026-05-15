'use client';

import { ProductGridItem } from "./ProductGridItem"
import { useEffect, useState, useMemo, useRef } from "react";
import useProductsStore from "@/store/products/products-store";
import { IoSearchOutline } from "react-icons/io5";

export const ProductGrid = () => {
    const getProducts = useProductsStore((state) => state.getProducts);
    const products = useProductsStore((state) => state.products);
    const loading = useProductsStore((state) => state.loading);
    const [search, setSearch] = useState("");
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
              <div key={section} ref={(el) => { sectionRefs.current[section] = el; }}>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{section}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                  {grouped[section].map((product) => (
                    <ProductGridItem key={product.nombre} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}
