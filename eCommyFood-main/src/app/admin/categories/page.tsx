
import { Modal, NewCategoryButton, Title } from "@/components";
import { CategoryForm } from "./ui/CategoryForm";
import { CategoriesTable } from './ui/CategoriesTable';

export default function CategoriesPage() {
 
  return (
    <>
      <Title title="Mantenimiento de categorias" />

      <NewCategoryButton>
        <div className="p-10">
          <CategoryForm  />
        </div>
      </NewCategoryButton>
    

     <CategoriesTable/>
    </>
  );
}