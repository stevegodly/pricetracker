"use client"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'
import { addUserEmailToProduct } from '@/lib/actions'
import {ProductContext} from  '@/components/ProductContext'
import { useContext } from "react";
import { productExists } from "@/lib/actions";

const Modal = ()=> {
  const router = useRouter();
  const {product}=useContext(ProductContext)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmitting(true);
    
    if (!session) {
      router.push("/signin");
      return;
    }
  
    try {
      if(session?.user?.email){
        const existingProduct = await productExists(session?.user?.email)
        if (existingProduct) {
          alert('Product is already tracked');
          return;
        }
          // Add user email to the product
        await addUserEmailToProduct(product, session?.user?.email);
        alert('Product successfully tracked!');
      }
      // Check if the product is already tracked
      
    } catch (error) {
      console.error('Error tracking product:', error);
      alert('An error occurred while tracking the product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
        {/* Form fields */}
        <button type="submit" className="btn">
          {isSubmitting ? 'Submitting...' : 'Track'}
        </button>
      </form>
    </>
  );
}  
export default Modal;