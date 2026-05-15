"use server"
export const getOrders = async() => {

    try {
      const data = await fetch(`${process.env.API_URL}/orders`)
      .then( res => res.json() );

      return data;
      
    } catch (error) {
      console.error("Errors fetching user data:", error);
    } 
  }
  