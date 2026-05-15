

import { create } from 'zustand'



interface State {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}


export const useModalStore = create<State>()((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen:true }),
  closeModal: () => set({ isModalOpen:false }),
}))

