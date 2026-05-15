import { getProducts } from '@/actions/product/get-products';
import { createProduct } from '@/actions/product/create-product';
import { deleteProduct } from '@/actions/product/delelete-product';
import { updateProduct } from '@/actions/product/update-product';
import { Product } from '../../interfaces/product.interface';
import {create} from 'zustand';

interface ProductStore {
  products: Product[];
  message: string;
  loading: boolean; // Estado de carga para la consulta de productosto
  getProducts: () => Promise<void>; // Cambiado a devolver una promesa
  addProduct: (newProduct: Product) => Promise<void>; // Cambiado a devolver una promesa
  deleteProduct: (id: number) => Promise<void>; // Cambiado a devolver una promesa
  updateProduct: (id: number, product:Product) => Promise<void>; // Cambiado a devolver una promesa
}

const useProductsStore = create<ProductStore>((set) => ({
  products: [],
  message: '',
  loading: false,
  getProducts: async () => {
    try {
      set({ loading: true });
      const fetchedProducts = await getProducts();
      set({ products: fetchedProducts ?? [] });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (newProduct) => {
    try {
      set({ loading: true });
      await createProduct(newProduct);
      set({ message: 'Se ingresó un nuevo producto' });
      const fetchedProducts = await getProducts();
      set({ products: fetchedProducts ?? [] });
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    try {
      set({ loading: true });
      await deleteProduct(id);
      set({ message: 'Se eliminó el producto' });
      const fetchedProducts = await getProducts();
      set({ products: fetchedProducts ?? [] });
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id, product) => {
    try {
      set({ loading: true });
      await updateProduct(id, product);
      set({ message: 'Se Actualizó el producto' });
      const fetchedProducts = await getProducts();
      set({ products: fetchedProducts ?? [] });
    } catch (error) {
      console.error('Error actualizando el product:', error);
    } finally {
      set({ loading: false });
    }
  },



}));

export default useProductsStore;