

import { Sidebar, TopMenu } from "@/components";


export default function ShopLayout({ children }: { children: React.ReactNode; }) {
  return (
    <main className="relative">
      <TopMenu/>
      <div className="pt-24"> {/* Agrega un padding top para que el contenido no se superponga con el TopMenu */}
        {children}
      </div>
     
    </main>
  );
}