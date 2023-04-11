import RestaurantMenu from "../../components/RestaurantMenu"
import RestaurantNavBar from "../../components/RestaurantNavBar"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const fetchMenu = async (slug: string) => {
   const restaurantMenu = await prisma.restaurant.findUnique({
      where: {
         slug
      },
      select: {
         items: true
      }
   })

   if (!restaurantMenu) {
      throw new Error()
   }

   return restaurantMenu.items
}

async function RestaurantMenuPage({params: {slug}}: {params: {slug: string}}) {
   const menu = await fetchMenu(slug)

   return (
      <>
         <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar slug={slug}/>
            <RestaurantMenu menu={menu}/>
         </div>
      </>
   )
}

export default RestaurantMenuPage