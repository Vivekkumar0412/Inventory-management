import DeleteUser from "@/components/delete";
import Sidebar from "@/components/sidebar";
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage({searchParams}:{searchParams : Promise<{q? : string}>}) {
  const user = await getCurrentUser();
  const userId = user.id;
  const params = await searchParams;
  const q = (params.q ?? "").trim()
  const allProducts = await prisma.product.findMany({
    where: {
      userId: userId,
      name : {contains : q,mode : "insensitive" }
    },
  });
  // console.log(allProducts, "all prod");
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/inventory" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Inventory
              </h1>
              <p className="text-sm text-gray-500">
                Mnage your products and tract your inventory
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
            {/* search section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <form className="flex gap-2" action="/inventory" method="GET">
                <input name="q" placeholder="search products" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"/>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Search</button>
            </form>
        </div>
          {/* product table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Low Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allProducts.map((prod, key) => (
                  <tr className="hover:bg-gray-50" key={key}>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {prod.name}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {prod.sku || "-"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {Number(prod.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {prod.quantity}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {prod.lowStockAt || "-"}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      <DeleteUser productId={prod.id}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
