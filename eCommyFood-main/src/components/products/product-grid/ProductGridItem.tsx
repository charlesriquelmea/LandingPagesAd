'use client';
import { Modal } from "@/components/ui/modal/Modal";
import { Product } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";
import { DetailProduct } from "../detail-product/DetailProduct";
import { useModalStore } from "@/store";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto bg-white rounded-3xl fade-in shadow-xl overflow-hidden card">
        <div className="max-w-sm md:h-[290px] card lg:h-[320px] xl:h-[350px]">
          <div onClick={openModal} className="cursor-pointer h-[60%] mobilesTiny">
            <Image
              src={product.imagenUrl}
              alt={product.nombre}
              className="h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
          {/* Info  */}
          <div className="px-4 py-2 h-[40%] mobilesTiny sm:px-6">
            <div className="h-auto font-bold text-gray-700 text-[18px] leading-7 mb-1">
              <h1 onClick={openModal} className="hover:text-orange-600 cursor-pointer leading-none h-[40px] flex items-center">
                {product.nombre}
              </h1>
            </div>
            <div className="flex flex-col">
              <p className="text-[17px] font-bold text-orange-500 text-base sm:text-lg">${product.precio}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Detalle del producto en desktop*/}
      {isModalOpen && (
        <Modal 
          title="Título del Modal" 
          isOpenModal={isModalOpen} 
          onCloseModal={closeModal}
          className="max-w-6xl"
        >
          <DetailProduct product={product} closeModal={closeModal}/>
        </Modal>
      )}
    </>
  );
};
