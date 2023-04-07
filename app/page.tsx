import NavBar from "./components/NavBar"
import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import { PrismaClient, Cuisine, PRICE, Location } from "@prisma/client"

const prisma = new PrismaClient()

export interface RestaurantCardType {
      id: number
      name: string
      main_image: string
      cuisine: Cuisine
      location: Location
      slug: string
      price: PRICE
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
   const restaurants = await prisma.restaurant.findMany({
      select: {
         id: true,
         name: true,
         main_image: true,
         cuisine: true,
         location: true,
         slug: true,
         price: true
      }
   })

   return restaurants
}

export default async function Home() {
   const restaurants = await fetchRestaurants()

   return (
      <main>
         <Header />
         {/* CARDS */}
         <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurants.map(restaurant => (
               <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))}
         </div>
         {/* CARDS */}
      </main>
   )
}
