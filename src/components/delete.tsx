"use client"

import deleteProduct from "@/lib/actions/product"
import { startTransition } from "react"

export default async function DeleteUser({ productId }: { productId: string }) {
      function handleDelete() {
    const isConfirmed = confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return;

    startTransition(() => deleteProduct(productId));
  }
  return <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={handleDelete}>Delete</button>
//   return <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={()=> deleteProduct(productId)}>Delete</button>
}
