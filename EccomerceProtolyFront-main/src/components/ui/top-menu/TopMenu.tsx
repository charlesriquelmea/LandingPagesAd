"use client";

import Link from "next/link";
import { IoSearchOutline, IoPersonOutline, IoMenuOutline } from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import useCategoriesStore from "@/store/categories/categories-store";
import useLoginStore from "@/store/userauth/login-store";
import { useEffect, useRef } from "react";
import { OffCanvas } from "../offcanvas/OffCanvas";
import { DoorDashSidebar } from "../hamburger/DoorDashSidebar";
import { useHamburgerStore } from "@/store/ui/hamburger-store";

const categoryEmojis: Record<string, string> = {
  'Bebidas': '🥤',
  'Snacks': '🍿',
  'Dulces y Postres': '🍪',
  'Lácteos y Huevos': '🥛',
  'Pan y Repostería': '🥖',
  'Enlatados y Conservas': '🥫',
  'Congelados': '🧊',
  'Limpieza': '🧹',
  'Alcohol': '🍺',
};

export const TopMenu = () => {
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const categories = useCategoriesStore((state) => state.categories);
  const getSesion = useLoginStore((state) => state.getSesion);
  const sesion = useLoginStore((state) => state.sesion);
  const openHamburger = useHamburgerStore((state) => state.openHamburger);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategories();
    getSesion();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="bg-white flex flex-col fixed w-full z-20 shadow-sm">
      <DoorDashSidebar />

      <nav className="flex items-center justify-between px-4 sm:px-8 h-16 max-w-7xl mx-auto w-full">

        <div className="flex items-center gap-2">
          <button
            onClick={openHamburger}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menú"
          >
            <IoMenuOutline className="w-5 h-5" />
          </button>

          <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold text-xl tracking-tight`}>
              Market
            </span>
          </Link>
        </div>

        <div className="hidden sm:flex flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <IoSearchOutline className="w-5 h-5" />
          </button>

          <OffCanvas />

          {sesion?.isSesion === false ? (
            <Link
              href="/auth/login"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <IoPersonOutline className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/admin/products"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
      </nav>

      {categories.length > 0 && (
        <div className="border-t border-gray-100 relative">
          <div className="max-w-7xl mx-auto w-full flex items-center px-4 sm:px-8">
            <button
              onClick={() => scroll('left')}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-600 text-lg font-bold mr-2"
              aria-label="Anterior"
            >
              ‹
            </button>

            <div
              ref={scrollRef}
              className="flex items-center gap-2 h-12 overflow-x-auto scrollbar-hide flex-1"
            >
              {categories.map((category) => (
                <Link
                  key={category.nombre}
                  href={`/category/${category.nombre.toLocaleLowerCase()}`}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-accent transition-all font-medium"
                >
                  <span className="text-base">{categoryEmojis[category.nombre] || '📦'}</span>
                  {category.nombre}
                </Link>
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-600 text-lg font-bold ml-2"
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
