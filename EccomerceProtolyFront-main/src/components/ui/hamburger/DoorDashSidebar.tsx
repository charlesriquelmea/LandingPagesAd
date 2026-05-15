"use client"
import { useHamburgerStore } from "@/store/ui/hamburger-store";
import useCategoriesStore from "@/store/categories/categories-store";
import Link from "next/link";
import { useEffect } from "react";
import { IoClose, IoHomeOutline, IoStorefrontOutline } from "react-icons/io5";

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

export const DoorDashSidebar = () => {
  const { isHamburgerOpen, closeHamburger } = useHamburgerStore();
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const categories = useCategoriesStore((state) => state.categories);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isHamburgerOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-black/50"
          onClick={closeHamburger}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 overflow-y-auto ${
          isHamburgerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-lg">Menú</span>
          <button
            onClick={closeHamburger}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-1">
          <Link
            href="/home"
            onClick={closeHamburger}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <IoHomeOutline className="w-5 h-5 text-accent" />
            Inicio
          </Link>

          <Link
            href="/"
            onClick={closeHamburger}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <IoStorefrontOutline className="w-5 h-5 text-accent" />
            Tienda
          </Link>
        </div>

        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Categorías
          </h3>
          <div className="space-y-0.5">
            {categories.map((category) => (
              <Link
                key={category.nombre}
                href={`/category/${category.nombre.toLocaleLowerCase()}`}
                onClick={closeHamburger}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="text-lg">{categoryEmojis[category.nombre] || '📦'}</span>
                {category.nombre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
