"use client";

import { ReactNode, useState } from "react";
import { Modal } from "../";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  children: ReactNode;
}

export const NewCategoryButton = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal


    // Función para abrir el modal
    const openModal = () => {
      setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
      setIsModalOpen(false);
    };


  return (
    <div className="mb-5">
      <button
        onClick={openModal}
        className="btn-primary"
      >
        <IoAddCircleOutline size={30}/>
      </button>
      <Modal
        title=""
        isOpenModal={isModalOpen} 
        onCloseModal={closeModal}
        className="max-w-xl"
      >
        {children}
      </Modal>
    </div>
  );
};
