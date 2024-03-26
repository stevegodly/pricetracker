"use client"
import {Product} from '@/types'
import {ProductContext} from  '@/components/ProductContext'
import { useContext } from "react";
import ProductCard  from "@/components/ProductCard";


const Results = () => {
  const { data } = useContext(ProductContext); // Assuming ProductContextType is defined

  return (
    <div className="flex flex-col gap-4 px-5 pt-4 min-h-32">
      {data?.map((product:Product, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default Results;
