"use client";
import addProduct from "@/lib/actions/addProduct";
import getProducts from "@/lib/actions/getProducts";
import updateProduct from "@/lib/actions/updateProduct";
import { prisma } from "@/lib/prisma";
import { useEffect, useState } from "react";
interface Product {
  id?: string;
  name: string;
  userId: string;
  sku: string;
  quantity: number;
  price: number;
  lowStockAt: number;
}
export default function AddProduct({
  userId,
  mode,
  productId,
}: {
  userId: string;
  mode: string;
  productId : string
}) {
  const [product, setProduct] = useState<Product>({
    name: "",
    sku: "",
    price: 0,
    quantity: 0,
    lowStockAt: 0,
    userId: userId,
  });
  async function handleSubmit(){
     if(productId && productId!== ""){
      updateProduct({productId,product})
    }else{
      addProduct(product)
    }
  }
  // async function getProducts(){
  //   const productss = await prisma.product.findUnique({
  //     where :{
  //       id : productId
  //     }
  //   });
  //   return productss
  // }
  useEffect(()=>{
    const data = getProducts(productId);
    console.log(data,"data from useeffect")
  },[productId])
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      {/* Product Name */}
      <div className="flex flex-col">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Product Name
        </label>
        <input
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          id="name"
          value={product.name}
          placeholder="Enter product name"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
      </div>

      {/* User ID */}
      <div className="flex flex-col">
        <label
          htmlFor="userId"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          User ID
        </label>
        <input
          type="text"
          id="userId"
          disabled
          value={userId}
          className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
        />
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label
          htmlFor="price"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <input
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
          type="number"
          id="price"
          placeholder="Enter Price"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
      </div>

      {/* SKU */}
      <div className="flex flex-col">
        <label htmlFor="sku" className="text-sm font-medium text-gray-700 mb-1">
          SKU
        </label>
        <input
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, sku: e.target.value }))
          }
          type="text"
          id="sku"
          placeholder="Enter SKU"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
      </div>

      {/* Quantity */}
      <div className="flex flex-col">
        <label
          htmlFor="quantity"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Quantity
        </label>
        <input
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              quantity: Number(e.target.value),
            }))
          }
          type="number"
          id="quantity"
          placeholder="Enter Quantity"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
      </div>
      {/* low stock at */}
      <div className="flex flex-col">
        <label
          htmlFor="lowStockAt"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Low Stock At
        </label>
        <input
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              lowStockAt: Number(e.target.value),
            }))
          }
          type="number"
          id="quantity"
          placeholder="Enter Low Stock"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
      >
        {mode == "add" ? "Add" : "Edit"}
      </button>
    </div>
  );
}
