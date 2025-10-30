"use server"
import { redirect } from "next/navigation";
import { prisma } from "../prisma";

interface Product{
    name : string,
    userId : string,
    sku : string,
    quantity : number,
    price : number,
    lowStockAt : number
}
export default async function addProduct(product : Product){
    console.log(product,"from frontend data");
    await prisma.product.create({
        data :{
            name : product.name,
            userId : product.userId,
            sku : product.sku,
            quantity : product.quantity,
            lowStockAt : product.lowStockAt,
            price : product.price
        }
    });
    console.log("product created !!")
    redirect("/inventory")
}