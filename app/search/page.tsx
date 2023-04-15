import SearchHeader from "./components/SearchHeader"
import SearchRestaurantCard from "./components/SearchRestaurantCard"
import SearchSideBar from "./components/SearchSideBar"

import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export interface RestaurantSearchCardType {
      id: number
      name: string
      main_image: string
      price: PRICE
      cuisine: Cuisine
      slug: string
      location: Location
}

const fetchRestaurantsByCity = async (cityName: string | undefined): Promise<RestaurantSearchCardType[]> => {
   cityName = cityName?.trim().toLowerCase()
   if (!cityName || cityName === "") {
      return []
   }

   let restaurants = await prisma.restaurant.findMany({
      where: {
         location: {
            name: {
               equals: cityName
            }
         }
      },
      select: {
         id: true,
         name: true,
         main_image: true,
         price: true,
         cuisine: true,
         slug: true,
         location: true
      }
   })

   return restaurants
}
async function Search({searchParams: {city}}: {searchParams: {city?:string}}) {
   const restaurantsFound = await fetchRestaurantsByCity(city)


   return (
      <>
         <SearchHeader />
         <div className="flex py-4 m-auto w-2/3 justify-between items-start">
            <SearchSideBar />
            <div className="w-5/6">
               {restaurantsFound.length > 0 ?
                  restaurantsFound.map(restaurant => (
                     <SearchRestaurantCard key={restaurant.id} restaurant={restaurant}/>
                  ))
                  :
                  <div className="flex w-full justify-center p-4">
                     <h2 className="text-3xl font-bold">No restaurants found :(</h2>
                  </div>
               }
            </div>
         </div>
      </>
   )
}

export default Search