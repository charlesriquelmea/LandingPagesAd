'use client';

import { Product, CartProduct } from '@/interfaces';
import { useUIStore } from '@/store';
import { useCartStore } from '@/store';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { IoClose, IoChevronDown } from 'react-icons/io5';

interface Props {
    product: Product;
    closeModal: () => void;
}

const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3 text-sm font-semibold text-gray-900 hover:text-accent transition-colors"
      >
        {title}
        <IoChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-3 text-sm text-gray-600 leading-relaxed">{children}</div>}
    </div>
  );
};

export const Detailproduct = ({ product, closeModal }:Props) => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const addProductToCart = useCartStore(state => state.addProductTocart);

  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    setCount(1);
  }, [product]);

  const onAddCart = () => {
    const cartItem: CartProduct = {
      nombre: product.nombre,
      price: product.precio,
      quantity: count,
      image: product.imagenUrl
    };

    addProductToCart(cartItem);
    closeModal();
    openSideMenu();
  };

  const onDecrement = () => {
    if (count <= 1) return;
    setCount(count - 1);
  };
  const onIncrement = () => {
    setCount(count + 1);
  };

  const unitPrice = product.precioPorUnidad || (product.tamano ? `$${(product.precio / 100).toFixed(2)}/unidad` : null);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="sm:w-1/2 bg-gray-50">
        <Image
          src={product.imagenUrl}
          alt={product.nombre}
          className="w-full h-64 sm:h-full object-cover"
          width={500}
          height={500}
        />
      </div>

      <div className="sm:w-1/2 p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{product.nombre}</h1>
          <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition-colors ml-2">
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <p className="text-3xl font-bold text-accent mb-1">
          ${product.precio}
        </p>

        {(product.tamano || unitPrice) && (
          <p className="text-sm text-gray-500 mb-2">
            {product.tamano && <span>{product.tamano}</span>}
            {product.tamano && unitPrice && <span> • </span>}
            {unitPrice && <span>{unitPrice}</span>}
          </p>
        )}

        {product.snapElegible && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded w-fit mb-3">
            SNAP
          </span>
        )}

        {product.descripcion && (
          <p className="text-sm text-gray-600 mb-3">{product.descripcion}</p>
        )}

        {product.sabor && (
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-gray-700">Sabor:</span> {product.sabor}
          </p>
        )}

        {/* Accordion sections */}
        <div className="mb-6">
          {product.detalles && (
            <AccordionSection title="Detalles">
              <p>{product.detalles}</p>
            </AccordionSection>
          )}
          {product.especificaciones && (
            <AccordionSection title="Especificaciones">
              <p>{product.especificaciones}</p>
            </AccordionSection>
          )}
          {product.ingredientes && (
            <AccordionSection title="Ingredientes">
              <p>{product.ingredientes}</p>
            </AccordionSection>
          )}
        </div>

        <div className="mt-auto flex items-center gap-4">
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={onDecrement}
              className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 text-base font-semibold min-w-[40px] text-center border-x border-gray-200">
              {count}
            </span>
            <button
              onClick={onIncrement}
              className="px-4 py-2 text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={onAddCart}
            className="flex-1 bg-accent text-white font-semibold py-2.5 px-6 rounded-xl hover:bg-red-700 transition-colors active:scale-95"
          >
            Agregar ${count * product.precio}
          </button>
        </div>
      </div>
    </div>
  );
}
