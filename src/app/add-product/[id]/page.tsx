// "use client";
import AddProduct from "@/components/addProduct";
import Sidebar from "@/components/sidebar";
import getCurrentUser from "@/lib/auth";
export default async function Page({params}:{params : {id : string}}) {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath="/add-product" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
          <p className="text-sm text-gray-700">
            Edit the details of the product here!
          </p>
          <h2>{params.id}</h2>
        </div>

        {/* Form Section */}
        <AddProduct userId={user.id} productId={params.id || ""} mode="edit"/>
      </div>
    </div>
  );
}
