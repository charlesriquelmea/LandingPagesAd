
import { Sesion } from "@/interfaces";


export function isLogedInLocalStorage(): Sesion {
  // Obtener el usuario almacenado en el local storage
  const storedUser = localStorage.getItem("usuario");

  // Comprobar si hay datos almacenados
  if (storedUser) {
    // Convertir los datos de cadena JSON a objeto JavaScript
    const usuario = JSON.parse(storedUser);
    return usuario; // Devolver el usuario almacenado
  } else {
    // Devolver un objeto vacío  indicando que no ha iniciado sesión
    return {
      isSesion:false,
      id:0,
      email:'',
    };
  }
}


// {
//   Object.keys(userLogued).length === 0 &&  ( <Link href="/auth/login">
//   <IoPersonOutline className="w-5 h-5" />
//   </Link>)
// }
