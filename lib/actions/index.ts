"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { Product as product ,User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function productExists(email:string) {
  try {
    connectToDB();

    const product = await Product.findOne({ email: email });

    if(!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}


export async function addUserEmailToProduct(product: product, userEmail: string[]) {
  try {
    if(userEmail){
      const emailProduct={title:product.title,url:product.link};
      const emailContent=await generateEmailBody(emailProduct,"WELCOME");
      await sendEmail(emailContent,userEmail)
    }    
    revalidatePath(`/products`);
  }
  catch (error) {
    console.log(error);
  }
}