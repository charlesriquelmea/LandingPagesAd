


import { NewProductButton, Title } from "@/components";
import { ProductForm } from "./ui/ProductForm";
import { ProductsTable } from "./ui/ProductsTable";
import {Modal} from "@/components/ui/modal/Modal";



interface Props {
  searchParams: {
    page?: string;
  };
}



export default async function ProductsPage({ searchParams }: Props) {

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;


  return (
    <>
      <Title title="Mantenimiento de productos" />

      <NewProductButton>
        <div className="p-10">
          <ProductForm/>
        </div>
      </NewProductButton>
     
  
      <ProductsTable/>

    </>
  );
}