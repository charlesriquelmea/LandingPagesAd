import { create } from 'zustand'

interface HamburgerState {
    isHamburgerOpen: boolean;
    openHamburger: () => void;
    closeHamburger: () => void;
    toggleHamburger: () => void;
}

export const useHamburgerStore = create<HamburgerState>()((set) => ({
    isHamburgerOpen: false,
    openHamburger: () => set({ isHamburgerOpen: true }),
    closeHamburger: () => set({ isHamburgerOpen: false }),
    toggleHamburger: () => set((state) => ({ isHamburgerOpen: !state.isHamburgerOpen })),
}))
