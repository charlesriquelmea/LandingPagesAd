import { Product } from "@/interfaces";
import { ProductGridItem } from "./product-grid/ProductGridItem";

interface FilteredProductsProps {
  products: Product[];
}

export const FilteredProducts: React.FC<FilteredProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 px-4 sm:px-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductGridItem
          key={product.nombre}
          product={product}
        />
      ))}
    </div>
  );
};
