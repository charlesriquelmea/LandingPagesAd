
import { loginUser } from '@/actions';

import {create} from 'zustand';
import { Usuario, RespuestaInicioSesion, Sesion } from '@/interfaces';
import { isLogedInLocalStorage } from '@/utils';

interface ProductStore {
  usuario: Usuario | null;
  sesion: Sesion;
  message: string;
  loading: boolean; 
  login: (user: Usuario) => Promise<void>; 
  logout: () => void;
  getSesion: () => void;
}

const useLoginStore = create<ProductStore>((set) => ({
  usuario: null,
  message: '',
  sesion: {
    id:0,
    email:'',
    isSesion:false
  },
  loading: false,
  login: async (user) => {
    try {
      set({ loading: true });
      const sesionUser:RespuestaInicioSesion = await loginUser(user);
      set({ message: sesionUser.message });
      set({ usuario: sesionUser.usuario });
      localStorage.setItem('usuario', JSON.stringify({ sesion: true, id: sesionUser.usuario.id, email: sesionUser.usuario.email, }));

    } catch (error) {
      alert('Credenciales incorrectos')
      console.error('Error en el login de usuario:', error);
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    // Eliminamos el usuario del local storage al cerrar sesión
    localStorage.removeItem('usuario');
    set({ usuario: null });
  },
  getSesion: () => {
    set({ sesion: isLogedInLocalStorage() });
  }
 
}));

export default useLoginStore;