
"use server"
export const getImagenes = async() => {

    try {
      const data = await fetch(`${process.env.API_URL}/imagenes`)
      .then( res => res.json() );

      return data;
      
    } catch (error) {
      console.error("Errors fetching user data:", error);
    } 
  }
  