"use client";

import Link from "next/link";
import { IoSearchOutline, IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { titleFont } from "@/config/fonts";
import useCategoriesStore from "@/store/categories/categories-store";
import useLoginStore from "@/store/userauth/login-store";
import { useEffect } from "react";
import { OffCanvas } from "../offcanvas/OffCanvas";

export const TopMenu = () => {
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const categories = useCategoriesStore((state) => state.categories);
  const getSesion = useLoginStore((state) => state.getSesion);
  const sesion = useLoginStore((state) => state.sesion);

  useEffect(() => {
    getCategories();
    getSesion();
  }, []);

  return (
    <div className="bg-white flex flex-col fixed w-full z-20 shadow-sm">
      <nav className="flex items-center justify-between px-4 sm:px-8 h-16 max-w-7xl mx-auto w-full">

        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold text-xl tracking-tight`}>
            Market
          </span>
        </Link>

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
        <div className="border-t border-gray-100">
          <div className="flex items-center gap-2 px-4 sm:px-8 h-12 max-w-7xl mx-auto w-full overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.nombre}
                href={`/category/${category.nombre.toLocaleLowerCase()}`}
                className="flex-shrink-0 text-sm px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-accent transition-all font-medium"
              >
                {category.nombre}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
