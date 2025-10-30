"use server"
import getCurrentUser from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteProduct( productId : string) {
    console.log(productId,"prid")
    console.log(typeof(productId))
    const user = await getCurrentUser();
    await prisma.product.delete({
      where: {
        id: productId,
        userId: user.id,
      },
    });

    revalidatePath("/inventory");
  
}
