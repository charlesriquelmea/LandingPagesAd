import Link from "next/link";
import { IoBagHandleOutline, IoStorefrontOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { SidebarMenuItem } from "./SidebarMenuItem";

const menuItems = [
  {
    path: "/admin/products",
    icon: (
      <div className="inline-flex justify-center items-center ml-4">
        <IoStorefrontOutline size={20}/>
      </div>
    ),
    title: "Productos",
  },
  {
    path: "/admin/categories",
    icon: (
      <div className="inline-flex justify-center items-center ml-4">
        <IoBagHandleOutline size={20} />
      </div>
    ),
    title: "Categorias",
  },
  {
    path: "/admin/orders",
    icon: (
      <div className="inline-flex justify-center items-center ml-4">
        <FaRegMoneyBillAlt size={20} />
      </div>
    ),
    title: "Ordenes",
  },
  {
    path: "/admin/imagenes",
    icon: (
      <div className="inline-flex justify-center items-center ml-4">
        <FaImage size={20} />
      </div>
    ),
    title: "Imagenes",
  },
  {
    path: "/admin/estadisticas",
    icon: (
      <div className="inline-flex justify-center items-center ml-4">
        <IoStorefrontOutline size={20}/>
      </div>
    ),
    title: "Estadisticas",
  },
];

export const Sidebar = () => {
  return (
    <div
      className={`fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10`}
    >
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Main
              </div>
            </div>
          </li>

          {/* Items sidebar */}
          {menuItems.map((menuItem) => (
            <SidebarMenuItem key={menuItem.path} {...menuItem} />
          ))}
          
        </ul>

        <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
          Copyright @2024
        </p>
      </div>
    </div>
  );
};
