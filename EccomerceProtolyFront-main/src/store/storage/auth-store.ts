import { authStorage } from "@/actions/storage/auth-storage";
import { create } from "zustand";

interface AuthenticatorData {
  signature: any;
  expire: any;
  token: any;
}

interface AuthStore {
  authenticator: AuthenticatorData;
  message: string;
  loading: boolean;
  auth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  authenticator: {
    signature: null,
    expire: null,
    token: null,
  },
  message: "",
  loading: false,
  auth: async () => {
    try {
      set({ loading: true });
      const data = await authStorage();
      set({ authenticator: data });
    } catch (error) {
      console.error("Error Auth Storage", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
