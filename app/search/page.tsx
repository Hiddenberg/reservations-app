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

export interface LocationSidebarType {
   id: number
   name: string
}

export interface CuisineSidebarType {
   id: number,
   name: string
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

async function fetchLocations () {
   const locations = await prisma.location.findMany({
      select: {
         name: true,
         id: true,
      }
   })

   return locations
}

async function fetchCuisins() {
   const cuisins = await prisma.cuisine.findMany({
      select: {
         name: true,
         id: true
      }
   })

   return cuisins
}


async function Search({searchParams}: {searchParams: {city?:string, cuisine?: string, price?: PRICE}}) {
   const restaurantsFound = await fetchRestaurantsByCity(searchParams.city)
   const locations = await fetchLocations()
   const cuisines = await fetchCuisins()


   return (
      <>
         <SearchHeader />
         <div className="flex py-4 m-auto w-2/3 justify-between items-start">
            <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams}/>
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