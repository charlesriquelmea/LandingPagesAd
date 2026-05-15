'use client';

import { useUIStore } from '@/store';
import Link from 'next/link';
import { IoBagHandleOutline, IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoStorefrontOutline, IoTicketOutline } from 'react-icons/io5';
import clsx from 'clsx';;
import useLoginStore from '@/store/userauth/login-store';
import { useRouter } from 'next/navigation';



export const Sidebar = () => {

  const router = useRouter();
  const isSideMenuOpen = useUIStore( state => state.isSideMenuOpen );
  const closeMenu = useUIStore( state => state.closeSideMenu );
  const logout = useLoginStore(state => state.logout)

  const onLogout = () => {
    logout();
    router.push('/auth/login');
  }


  return (
    <div>

      {/* Background black */ }
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />

        )
      }


      {/* Blur */ }
      {
        isSideMenuOpen && (
          <div
            onClick={ closeMenu }
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />

        )
      }

      {/* Sidemenu */ }
      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0   w-[500px]   h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>


        <IoCloseOutline
          size={ 50 }
          className="absolute top-5 right-5 cursor-pointer"
          onClick={ () => closeMenu() }
        />


        {/* Input */ }
        <div className="relative mt-14">
          <IoSearchOutline size={ 20 } className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */ }

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={ 30 } />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        {/* <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={ 30 } />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link> */}

        {/* <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={ 30 } />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link> */}

        <button
          onClick={onLogout}
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={ 30 } />
          <span className="ml-3 text-xl">Salir</span>
        </button>

        {/* Line Separator */ }
        <div className="w-full h-px bg-gray-200 my-5" />


        <Link
          href="/admin/products"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoStorefrontOutline   size={ 30 } />
          <span className="ml-3 text-xl">Productos</span>
        </Link>

        <Link
          href="/admin/categories"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoBagHandleOutline  size={ 30 } />
          <span className="ml-3 text-xl">Categorias</span>
        </Link>

        {/* <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={ 30 } />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link> */}

        {/* <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={ 30 } />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link> */}


      </nav>





    </div>
  );
};