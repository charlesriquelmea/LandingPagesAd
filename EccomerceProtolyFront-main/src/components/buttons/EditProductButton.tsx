"use client";
import { ReactNode, useState } from "react";
import { Modal } from "../ui/modal/Modal";
import { IoCreateOutline } from "react-icons/io5";

interface Props {
  children: ReactNode;
}

export const EditProductButton = ({ children }: Props) => {
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
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 w-8 h-8 rounded-lg flex justify-center items-center hover:bg-blue-600"
      >
        <IoCreateOutline className="w-5 h-5 text-white cursor-pointer" />
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
