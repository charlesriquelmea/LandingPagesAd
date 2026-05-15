import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useCartStore } from "@/store";
import { CartProduct } from '@/interfaces';

interface Product {
  nombre: string;
  price: number;
  image: string;

}

export const ItemCart = ({ product }: { product: CartProduct }) => {
  const cartStore = useCartStore();

  const handleRemoveProduct = () => {
    cartStore.removeProduct(product);
  };


  const handleIncrementQuantity = () => {
    cartStore.incrementProductQuantity(product.nombre);
  };

  const handleDecrementQuantity = () => {
    cartStore.decrementProductQuantity(product.nombre);
  };


  return (
    <div className="flex mb-2 rounded-lg p-6 shadow-md bg-white">
      <Image
        className="rounded-lg h-[80px] w-[80px] object-cover"
        src={product.image} // Usa la URL de la imagen del producto
        alt="product-image"
        width={100}
        height={100}
      />
      <div className="ml-4 flex w-full justify-between gap-2">
        {/* Elementos */}
        <div className="mt-0">
          <h2 className="text-sm text-gray-900 leading-none">{product.nombre}</h2> {/* Usa el nombre del producto */}
          <p className="text-xs font-bold mt-2">${product.price * product.quantity}</p> {/* Usa el precio del producto */}
          <div className="flex items-center border-gray-100 mt-2">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={handleDecrementQuantity}> - </span>
            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={product.quantity} min="1" readOnly/>
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={handleIncrementQuantity}> + </span>
          </div>
        </div>
        {/* Close button */}
        <div className="flex justify-between  mt-0 sm:block ">
          <div className="flex items-start space-x-4">
            <IoClose size={25}onClick={handleRemoveProduct} className="text-gray-500"/>
          </div>
        </div>
      </div>
    </div>
  );
};

