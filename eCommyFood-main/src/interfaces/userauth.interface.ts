export interface Usuario {
  id?: number;
  email: string;
  contraseña: string;
}

export interface RespuestaInicioSesion {
  message: string;
  usuario: Usuario;
}



export interface Sesion {
  isSesion: boolean;
  id: number;
  email: string;
}