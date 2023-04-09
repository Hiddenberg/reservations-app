import RestaurantNavBar from "../components/RestaurantNavBar"
import RestaurantTitle from "../components/RestaurantTitle"
import RestaurantRating from "../components/RestaurantRating"
import RestaurantDescription from "../components/RestaurantDescription"
import RestaurantImages from "../components/RestaurantImages"
import RestaurantReviews from "../components/RestaurantReviews"
import RestaurantReservationCard from "../components/RestaurantReservationCard"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
interface Restaurant {
   id: number;
   name: string;
   images: string[];
   description: string;
   slug: string;
}

const fetchRestaurant = async (slug: string): Promise<Restaurant> => {
   const restaurant = await prisma.restaurant.findUnique({
      where: {
         slug
      },
      select: {
         id: true,
         name: true,
         images: true,
         description: true,
         slug: true
      }
   })

   if (!restaurant) {
      throw new Error("Could not fetch restaurant")
   }

   return restaurant
}

async function RestaurantDetails({params: {slug}}: {params: {slug: string}}) {
   const restaurant = await fetchRestaurant(slug)

   return (
      <>
         <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar slug={slug}/>
            <RestaurantTitle name={restaurant.name}/> 
            <RestaurantRating /> 
            <RestaurantDescription description={restaurant.description}/> 
            <RestaurantImages images={restaurant.images}/> 
            <RestaurantReviews />
         </div>
         <div className="w-[27%] relative text-reg">
            <RestaurantReservationCard />
         </div>
      </>
   )
}

export default RestaurantDetails