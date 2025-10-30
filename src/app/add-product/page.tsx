// "use client";
import AddProduct from "@/components/addProduct";
import Sidebar from "@/components/sidebar";
import getCurrentUser from "@/lib/auth";
export default async function Page() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPath="/add-product" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-700">
            Add all the details of the product here!
          </p>
        </div>

        {/* Form Section */}
        <AddProduct userId={user.id} productId="" mode="add"/>
      </div>
    </div>
  );
}
