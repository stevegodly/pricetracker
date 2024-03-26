"use client"
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {Product} from '@/types'


// Create the product context
export const ProductContext = createContext<any>({});

// ProductContextProvider component
export function ProductContextProvider({ children }: { children: React.ReactNode }) {
  // Define state variable for product data
  const [data, setData] = useState<Product[] | null>(null);
  const [product, setProduct] =useState<Product | null>(null);
  // Fetch product data from an API endpoint using useEffect
  return (
    // Provide the context value to its children
    <ProductContext.Provider value={{ data, setData ,product,setProduct}}>
      {children}
    </ProductContext.Provider>
  );
}