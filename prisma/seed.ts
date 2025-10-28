import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

async function main() {
    const userId = "a3c24c66-3808-4131-b6db-dc052b6f576f";
   
 const products = Array.from({length : 25}).map((_,i)=>(
    {
        userId : userId,
        name : `Product ${i + 1}`,
        price : (Math.random() * 90).toFixed(2),
        sku : `SKU-${i + 25}`,
        quantity : Math.floor(Math.random()*25),
        lowStockAt : 6,
        createdAt : new Date(Date.now() - 1000 * 60 * 60 *24 * (i * 5))
    }
 ))
    await prisma.product.createMany({
        data: products
    });
    console.log("Products created" )
};

main()
.catch((err)=>{
    console.log(err)
    process.exit(1)
})
.finally(async()=>{
    await prisma.$disconnect();
})