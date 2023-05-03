import SearchHeader from "./components/SearchHeader"
import SearchRestaurantCard from "./components/SearchRestaurantCard"
import SearchSideBar from "./components/SearchSideBar"

import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client"

const prisma = new PrismaClient()

export interface RestaurantSearchCardType {
      id: number
      name: string
      main_image: string
      price: PRICE
      cuisine: Cuisine
      slug: string
      location: Location
      reviews: Review[]
}

export interface LocationSidebarType {
   id: number
   name: string
}

export interface CuisineSidebarType {
   id: number,
   name: string
}

export interface SearchParamsType {
   city?:string, 
   cuisine?: string, 
   price?: PRICE
}

const fetchRestaurants = async (searchParams: SearchParamsType): Promise<RestaurantSearchCardType[]> => {
   const whereQuery: any = {}

   if (searchParams.city) {
      whereQuery.location = {
         name: {
            equals: searchParams.city
         }
      }
   }
   if (searchParams.cuisine) {
      whereQuery.cuisine = {
         name: searchParams.cuisine
      }
   }
   if (searchParams.price) {
      whereQuery.price = searchParams.price
   }

   let restaurants = await prisma.restaurant.findMany({
      where: whereQuery,
      select: {
         id: true,
         name: true,
         main_image: true,
         price: true,
         cuisine: true,
         slug: true,
         location: true,
         reviews: true
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


async function Search({searchParams}: {searchParams: SearchParamsType}) {
   const restaurantsFound = await fetchRestaurants(searchParams)
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