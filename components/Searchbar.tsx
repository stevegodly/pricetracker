"use client"
import React, { FormEvent, useState, useContext } from 'react';
import {ProductContext} from  '@/components/ProductContext'
import { scrapeAmazonProduct } from '@/lib/scraper';
import { useRouter } from 'next/navigation';


const Searchbar = () => {
  const router = useRouter();
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {setData}=useContext(ProductContext)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      // Scrape the product page
      const product = await scrapeAmazonProduct(searchPrompt);
      setData(product)
      setIsLoading(false)
      router.push('/Results');

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form 
      className="flex flex-wrap gap-4 mt-12" 
      onSubmit={handleSubmit}
    >
      <input 
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product"
        className="searchbar-input"
      />

      <button 
        type="submit" 
        className="searchbar-btn"
        disabled={searchPrompt === ''}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default Searchbar