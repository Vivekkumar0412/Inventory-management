"use server"
import { prisma } from "../prisma";

 export default async function getProducts(productId : string){
    const productss = await prisma.product.findUnique({
      where :{
        id : String(productId)
      }
    });
    console.log(productss,"pfjsbhdflfjhjl")
    return productss
  }