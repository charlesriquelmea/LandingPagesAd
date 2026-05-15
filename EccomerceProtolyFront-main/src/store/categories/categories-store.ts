import { getCategories } from '@/actions/category/get-categories';
import { createCategory } from '@/actions/category/create-category';
import { deleteCategory } from '@/actions/category/delelete-category';
import { Category } from '@/interfaces';
import {create} from 'zustand';

interface CategoryStore {
  categories: Category[];
  message: string;
  loading: boolean; 
  getCategories: () => Promise<void>; 
  addCategory: (newCategory: Category) => Promise<void>; 
  deleteCategory: (id:number) => Promise<void>; 
}

const useCategoriesStore = create<CategoryStore>((set) => ({
  categories: [],
  message: '',
  loading: false,
  getCategories: async () => {
    try {
      set({ loading: true });
      const fetchedCategories = await getCategories();
      set({ categories: fetchedCategories ?? [] });
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      set({ loading: false });
    }
  },
  addCategory: async (newCategory) => {
    try {
      set({ loading: true });
      await createCategory(newCategory);
      set({ message: 'Se ingresó una nueva categoría' });
      const fetchedCategories = await getCategories();
      set({ categories: fetchedCategories ?? [] });
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      set({ loading: false });
    }
  },
  deleteCategory: async (id) => {
    try {
      set({ loading: true });
      await deleteCategory(id);
      set({ message: 'Se eliminó la categoría' });
      const fetchedCategories = await getCategories();
      set({ categories: fetchedCategories ?? [] });
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoriesStore;