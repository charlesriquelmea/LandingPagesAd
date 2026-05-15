"use client";

import Link from "next/link";
import { IoSearchOutline, IoCartOutline, IoPersonOutline } from "react-icons/io5";
import { HiMenuAlt2 } from "react-icons/hi";
import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";
import useCategoriesStore from "@/store/categories/categories-store";
import useLoginStore from "@/store/userauth/login-store";
import { useEffect } from "react";
import { OffCanvas } from "../offcanvas/OffCanvas";

export const TopMenu = () => {
  // ESTADOS GLOBALES
  const getCategories = useCategoriesStore((state) => state.getCategories);
  const categories = useCategoriesStore((state) => state.categories);
  const getSesion = useLoginStore((state) => state.getSesion);
  const sesion = useLoginStore((state) => state.sesion);

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);

  // FUNCIONES Y EVENTOS
  useEffect(() => {
    getCategories();
    // Hay que obtener la sesion del local storage mediante un useEffect porque sino dará un error
    getSesion();
  }, [getCategories, getSesion]); // Añadido getCategories y getSesion como dependencias

  return (
    <div className="bg-white flex flex-col fixed w-full z-20">
      <nav className="bg-orange-200 flex px-10 h-14 justify-between items-center w-full border-b-[1px]">
        {/* Logo */}
        <div>
          <Link href="/">
            <img src="/imgs/logo.png" width={250} height={250} alt="Logo" />
          </Link>
        </div>

        {/* search, cart y menu */}
        <div className="flex items-center gap-4">
          <Link href="">
            <IoSearchOutline className="w-5 h-5" />
          </Link>

          {/* Este offcanvas contiene el carrito de compras */}
          <OffCanvas />

          {sesion?.isSesion === false ? (
            <Link href="/auth/login">
              <IoPersonOutline className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/admin/products"
              className="text-sm p-2 rounded-md transition-all hover:bg-gray-100"
            >
              Dashboard
            </Link>
          )}
        </div>
      </nav>

      {/* categories */}
      <div className="bg-white font-semibold h-10 flex justify-center items-center shadow-md">
        {categories && categories.length > 0 ? (  // Verifica si categories está definido y tiene elementos
          categories.map((category) => (
            <Link
              key={category.nombre}
              className="text-sm m-2 px-2 py-1 rounded-md transition-all hover:bg-gray-100"
              href={`/category/${category.nombre.toLocaleLowerCase()}`}
            >
              {category.nombre}
            </Link>
          ))
        ) : (
          <p>Cargando Categorias...</p>
        )}
      </div>
    </div>
  );
};