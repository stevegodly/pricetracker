"use server"
import {PriceHistoryItem} from '@/types'
import axios from 'axios';
import * as cheerio from 'cheerio';
import {Product} from '@/types'

export async function scrapeAmazonProduct(url: string) {
  if(!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    const productUrl=`https://www.amazon.in/${url}/s?k=${url}`
    
    const response = await axios.get(productUrl, options);
    const $ = cheerio.load(response.data);

    const dataArray :Product[]= [];
    $('.puisg-row').each((index, element) => {
      const title = $(element).find('.s-title-instructions-style a.a-text-normal').text().trim();
      const links = $(element).find('.s-title-instructions-style a.a-text-normal').attr('href');
      const image= $(element).find('.s-product-image-container img').attr('src') || '';    
      const currency=$(element).find('.puis-price-instructions-style span.a-price-symbol').text().trim()
      const currentPrice = $(element).find('.puis-price-instructions-style span.a-price-whole').text().trim()
      const oldPrice=$(element).find('.puis-price-instructions-style .a-text-price span.aria-hiddden').text().trim()
      const buyers=$(element).find('.a-spacing-top-micro span.s-underline-text').text().trim()
      const priceHistory : PriceHistoryItem[]=[]
      const highestPrice = currentPrice
      const lowestPrice=currentPrice
      const averagePrice=currentPrice

      if (links) {
        dataArray.push({ id:index,title, image,currentPrice,oldPrice,buyers,averagePrice,currency,highestPrice,lowestPrice,priceHistory,link: `https://www.amazon.in${links}`});
      }
    });
      if(dataArray.length===0) console.log("empty")
      return dataArray;
  } 
  catch (error: any) {
    console.log(error);
  }
}