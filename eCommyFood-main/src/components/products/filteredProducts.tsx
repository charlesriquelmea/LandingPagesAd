import { Product } from "@/interfaces";
import { ProductGridItem } from "./product-grid/ProductGridItem";

interface FilteredProductsProps {
  products: Product[] | undefined; // Permitir que products sea undefined
}

export const FilteredProducts: React.FC<FilteredProductsProps> = ({ products }) => {
  // Verificar si products es un arreglo
  if (!Array.isArray(products)) {
    return <div>No hay productos disponibles.</div>; // Mensaje opcional si no hay productos
  }

  return (
    <div className="flex flex-wrap justify-center gap-5 mx-auto mb-10
    sm:justify-start sm:mx-10
    md:justify-center md:mx-10
    lg:justify-center lg:mx-auto lg:max-w-6xl
    xl:justify-center xl:mx-auto xl:max-w-7xl">
      
      {products.map((product) => (
        <ProductGridItem 
          key={product.nombre}
          product={product}
        />
      ))}
    </div>
  );
};
