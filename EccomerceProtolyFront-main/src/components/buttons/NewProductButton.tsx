"use client";

import { ReactNode, useState } from "react";
import { Modal } from "../";
import { IoAddCircleOutline } from "react-icons/io5";

interface Props {
  children: ReactNode;
}

export const NewProductButton = ({ children }: Props) => {
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
        title="Header"
        isOpenModal={isModalOpen} 
        onCloseModal={closeModal}
        className="max-w-3xl"
      >
        {children}
      </Modal>
    </div>
  );
};
