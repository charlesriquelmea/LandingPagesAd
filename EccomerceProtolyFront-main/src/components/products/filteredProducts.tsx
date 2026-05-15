import { Product } from "@/interfaces";
import { ProductGridItem } from "./product-grid/ProductGridItem";

interface FilteredProductsProps {
  products: Product[];
}

export const FilteredProducts: React.FC<FilteredProductsProps> = ({ products }) => {
  const grouped: Record<string, Product[]> = {};
  for (const p of products) {
    const key = p.subcategoria || 'Otros';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  }

  const sectionKeys = Object.keys(grouped);

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {sectionKeys.map((section) => (
        <div key={section}>
          <h2 className="text-lg font-bold text-gray-900 mb-3">{section}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {grouped[section].map((product) => (
              <ProductGridItem
                key={product.nombre}
                product={product}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
