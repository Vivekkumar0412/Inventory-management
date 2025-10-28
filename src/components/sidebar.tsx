import { BsFillLungsFill } from "react-icons/bs";
import { MdInventory,MdOutlineSettings} from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Link from "next/link";
import getCurrentUser from "@/lib/auth";
export default async function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
    const navigation = [
        {
            name : "Dashboard",icon :BsFillLungsFill,href:"/dashboard"
        },
        {
            name :'Inventory', icon : MdInventory, href:"/inventory"
        },
        {
            name :'Add Product', icon : AiOutlineProduct, href:"/add-product"
        },
        {
            name :'Settings', icon : MdOutlineSettings, href:"/settings"
        },
    ]
    const user = await getCurrentUser();
    // console.log(user,"user")
  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BsFillLungsFill className="w-15 h-15" />
        <span className="text-lg font-semibold">Inventory</span>
        </div>
      </div>
      <nav className="space-y-1">
        <div className="text-sm w-full font-semibold text-gray-400 uppercase">
            {navigation.map((nav,key)=>{
                const CurrentIcon = nav.icon
                return(
                    <Link key={key} className={`flex space-x-3 p-3 text-white rounded-xm hover:bg-gray-800 ${currentPath == nav.href? "bg-amber-700" :"bg-gray-900"}`} href={nav.href}><CurrentIcon className="font-semibold text-xl"/><span className="text-xl">{nav.name}</span></Link>
                )
            })}
        </div>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700">
        <div className="flex itmes-center justify-between">
            <Link href="/settings" className="text-3xl font-semibold"><img src={user.profileImageUrl!} alt="user profile picture" width="50" height="60" className="rounded-full"/> <span>{user.displayName}</span></Link>
        </div>
      </div>
    </div>
  );
}
