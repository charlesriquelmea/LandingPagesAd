"use client";
import React, { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  title?: string;
  children: ReactNode;
  isOpenModal: boolean;
  onCloseModal: () => void;
  className?: string;
}

export const Modal = ({ title, children, isOpenModal, onCloseModal, className = "" }: ModalProps) => {
  if (!isOpenModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60" onClick={onCloseModal} />

      <div className={`relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${className}`}>
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onCloseModal} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
