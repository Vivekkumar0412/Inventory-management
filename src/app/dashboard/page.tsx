import ProductsChart from "@/components/product-chart";
import Sidebar from "@/components/sidebar";
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { IoIosTrendingUp } from "react-icons/io";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;
  const totalProducts = await prisma.product.count({
    where: {
      userId: userId,
    },
  });

  const lowStock = await prisma.product.count({
    where: { userId, lowStockAt: { not: null }, quantity: { lte: 5 } },
  });

  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const allProducts = await prisma.product.findMany({
    where: { userId },
    select: { name: true, price: true, quantity: true, createdAt: true },
  });

  const totalValue = allProducts.reduce(
    (a, prod) => a + Number(prod.price) * Number(prod.quantity),
    0
  );
  // console.log(totalValue, "total");
  const now = new Date();
  const weeklyProductData = [];
  for(let i = 11; i>= 0; i--){
    const weekStart = new Date(now)
    weekStart.setDate(weekStart.getDate() - i*7)
    weekStart.setHours(0,0,0,0);

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    weekStart.setHours(23,59,59,999);

    const weekLabel = `${String(weekStart.getMonth() + 1 ).padStart(2,"0")}/${String(weekStart.getDate() + 1 ).padStart(2,"0")}`;

    const weekProducts = allProducts.filter((prod)=>{
      const productDate = new Date(prod.createdAt);
      return productDate >= weekStart && productDate<= weekEnd
    })

    weeklyProductData.push({
      week : weekLabel,
      products : weekProducts.length
    })
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-68 p-8">
        {/* header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                <span className="text-red-600 uppdercase">D</span>ashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! here is an overview of your{" "}
                <span className="text-red-600 uppdercase">Inventory</span>
              </p>
            </div>
          </div>
        </div>
        {/* key matrix section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6 ">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-900">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-500">
                    +{totalProducts}
                  </span>
                  <IoIosTrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  ${Number(totalValue).toFixed(0)}
                </div>
                <div className="text-sm text-gray-900">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-500">
                    +{Number(totalValue).toFixed(0)}
                  </span>
                  <IoIosTrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {lowStock}
                </div>
                <div className="text-sm text-gray-900">Lowstocks</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-500">+{lowStock}</span>
                  <IoIosTrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
          {/* inventory graph */}
          <div className="bg-white rounded-lg border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>New products per week</h2>
            </div>
            <div className="h-48">
              <ProductsChart data={weeklyProductData}/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* stock level section */}
          <div className="bg-white rounded-lg p-6 border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Stock Level
              </h2>
            </div>
            <div className="space-y-3 ">
              {recent.map((item, key) => {
                const stockLevel = item.quantity === 0 ? 0 : item.quantity <= (item.lowStockAt || 5) ? 1:2;
                const bgColors = ["bg-red-600","bg-yellow-600","bg-green-600"];
                const bgText = ["text-red-600","text-yellow-600","text-green-600"];
                return (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="felx items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                      <span className="text-xm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className={`text-sm font-medium ${bgText[stockLevel]}`}>{item.quantity} units</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* effeciency section */}
        {/* <div className="bg-white border-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Efficiency</h2>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  
                </div>
              </div>
        </div> */}
      </main>
    </div>
  );
}
