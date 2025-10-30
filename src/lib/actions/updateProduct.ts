"use server";

import { prisma } from "../prisma";
interface Product {
    id?: string,
    name: string,
    userId: string,
    sku: string,
    quantity: number,
    price: number,
    lowStockAt: number
}
export default async function updateProduct({ productId, product }: { productId: string, product: Product }) {
    const productObj = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });
    if (!productObj) {
        return "product not found"
    }
    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: product.name,
            userId: product.userId,
            sku: product.sku,
            quantity: product.quantity,
            lowStockAt: product.lowStockAt,
            price: product.price
        }
    })
}