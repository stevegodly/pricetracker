"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import {Product} from '@/types'
import {ProductContext} from  '@/components/ProductContext'
import { useContext } from "react";
 
const ProductCard = ({ product }: { product: Product }) => {
  const {setProduct}=useContext(ProductContext)
  const handle=()=>{
      setProduct(product);
  }
  return (
      <Link href={`/products`}  passHref>
        <div className="product-card" onClick={handle}> 
          <div className="product-card_img-container">
            <Image 
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              className="product-card_img"
            />
          </div>

          <div className="flex flex-col gap-3 max-w-5xl">
            <h3 className="product-title">{product.title}</h3>
            <div className="flex flex-col justify-between">
              <p className='text-black opacity-50 text-lg capitalize'>({product.buyers})</p>
              <p className="text-black text-lg font-semibold">
                <span>{product.currency}</span>
                <span>{product.currentPrice}</span>
                <span className='text-slate-400'>   M.R.P </span>
                <span className='line-through'>   {product.oldPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default ProductCard;