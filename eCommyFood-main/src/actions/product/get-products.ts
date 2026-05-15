'use server';

import { Product } from "@/interfaces";

export const getProducts = async() => {

    try {
      const data:Product[] = await fetch(`${process.env.API_URL}/producto`)
      .then( res => res.json() );

      // console.log(data)
      return data;
      
    } catch (error) {
      console.error("Errors fetching user data:", error);
    } 
  }
  