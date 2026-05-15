
import { Header, Sidebar } from "./components/ui";

export default function AdminLayout({children}: { children: React.ReactNode; }) {

 
  return (
    <> 
      <Header/>
      <Sidebar/>
   
      {/* Medidas respondive del contenido de dashboard */}
      <div className="pt-[70px] pl-[80px]  md:pt-[70px] md:pl-[280px]">
        { children }
      </div>

    </>
  );
}