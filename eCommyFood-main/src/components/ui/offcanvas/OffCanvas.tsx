"use client";
import { ItemCart } from "@/components/cart/ItemCart";
import { useUIStore } from "@/store";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { useCartStore } from "@/store";
import { CartProduct } from "@/interfaces";

export const OffCanvas = () => {
  const { isSideMenuOpen, openSideMenu, closeSideMenu } = useUIStore();
  const [cartItems, setCartItems] = useState<CartProduct[]>([]); // Define el tipo de estado inicial

  const cartStore = useCartStore();

  useEffect(() => {
    setCartItems(cartStore.cart);
  }, [cartStore.cart]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <>
      {/* Capa de fondo con degradado */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50"
          onClick={closeSideMenu}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 transition-transform ${
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        } bg-white w-full sm:w-[490px]`}
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
      >
        {/* Header */}
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold"
        >
          Carrito
        </h5>
        <button
          type="button"
          onClick={closeSideMenu}
          aria-controls="drawer-right-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
        >
          <IoClose size={30} />
          <span className="sr-only">Cerrar menú</span>
        </button>

        {/* Content */}
        <div className="relative h-[85vh]">
          {/* Aquí va tu contenido */}

          {/* Contenedor de las tarjetas */}
          <div className="py-4">
            {cartItems.map((product, index) => (
              <ItemCart key={product.id || index} product={product} />
              // Si product.id no es único, puedes usar el índice así:
              // <ItemCart key={index} product={product} />
            ))}
          </div>

          {/* Botón "Confirmar" */}
          <div className="fixed bg-white h-[80px] bottom-15 flex justify-center items-center w-[92%]">
            <Link
              href="/checkout"
              className="flex justify-between items-center gap-20 h-[50px] w-full px-4 py-2 bg-secondary rounded-lg shadow-md"
            >
              <span>✔</span>
              <span>Confirmar</span>
              <span>${totalPrice}</span> {/* Mostrar el precio total */}
            </Link>
          </div>
        </div>
      </div>

      {/* Boton del carrito */}
      <button type="button" onClick={openSideMenu}>
        <div className="relative">
          <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-white">
            {totalItems}
          </span>
          <IoCartOutline className="w-5 h-5" />
        </div>
      </button>
    </>
  );
};