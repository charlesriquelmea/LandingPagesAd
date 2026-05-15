import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useCartStore } from "@/store";
import { CartProduct } from '@/interfaces';

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
    <div className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
      <Image
        className="rounded-lg h-20 w-20 object-cover flex-shrink-0"
        src={product.image}
        alt={product.nombre}
        width={80}
        height={80}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">{product.nombre}</h3>
          <button onClick={handleRemoveProduct} className="p-0.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
            <IoClose className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <p className="text-sm font-bold text-accent mt-1">${product.price * product.quantity}</p>
        <div className="flex items-center gap-1 mt-auto">
          <button
            onClick={handleDecrementQuantity}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium">{product.quantity}</span>
          <button
            onClick={handleIncrementQuantity}
            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
