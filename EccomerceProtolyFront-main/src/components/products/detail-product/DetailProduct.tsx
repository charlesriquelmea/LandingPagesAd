'use client';

import { Product, CartProduct } from '@/interfaces';
import { useUIStore } from '@/store';
import { useCartStore } from '@/store';
import useProductsStore from '@/store/products/products-store';
import Image from 'next/image';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { IoClose, IoChevronDown, IoArrowBack } from 'react-icons/io5';
import { ProductGridItem } from '../product-grid/ProductGridItem';

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

export const Detailproduct = ({ product, closeModal }: Props) => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const addProductToCart = useCartStore(state => state.addProductTocart);
  const products = useProductsStore((state) => state.products);
  const getProducts = useProductsStore((state) => state.getProducts);

  const [count, setCount] = useState<number>(1);
  const relatedRef = useRef<HTMLDivElement>(null);

  const scrollRelated = (dir: 'left' | 'right') => {
    if (!relatedRef.current) return;
    const amount = 260;
    relatedRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  useEffect(() => {
    setCount(1);
  }, [product]);

  useEffect(() => {
    if (products.length === 0) getProducts();
  }, []);

  const related = useMemo(() => {
    if (!product.subcategoria) return [];
    return products.filter(
      (p) => p.subcategoria === product.subcategoria && p.nombre !== product.nombre
    ).slice(0, 8);
  }, [products, product]);

  const onAddCart = () => {
    const cartItem: CartProduct = {
      nombre: product.nombre,
      price: product.precio,
      quantity: count,
      image: product.imagenUrl
    };

    addProductToCart(cartItem);
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
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row">

        <div className="sm:w-1/2 bg-gray-50 sm:max-h-[500px] flex items-start">
          <Image
            src={product.imagenUrl}
            alt={product.nombre}
            className="w-full h-64 sm:h-[400px] object-cover sm:object-contain sm:bg-gray-50"
            width={500}
            height={500}
          />
        </div>

        <div className="sm:w-1/2 p-6 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition-colors sm:hidden">
                <IoArrowBack className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{product.nombre}</h1>
            </div>
            <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-lg transition-colors ml-2 hidden sm:block">
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
      {related.length > 0 && (
        <div className="px-6 pb-6 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Productos relacionados</h3>
          <div className="relative group">
            <div
              ref={relatedRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 px-8"
            >
              {related.map((p) => (
                <div key={p.id ?? p.nombre} className="flex-shrink-0 w-[120px]">
                  <ProductGridItem product={p} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRelated('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-600 text-base font-bold opacity-0 group-hover:opacity-100"
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              onClick={() => scrollRelated('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-600 text-base font-bold opacity-0 group-hover:opacity-100"
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
