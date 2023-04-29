import Link from "next/link"
import { CuisineSidebarType, LocationSidebarType } from "../page"
import { PRICE } from "@prisma/client"

function SearchSideBar({locations, cuisines, searchParams}: 
   {
      locations: LocationSidebarType[],
      cuisines: CuisineSidebarType[],
      searchParams: {city?:string, cuisine?: string, price?: PRICE}
   }) {
   return (
      <div className="w-1/5">
         <div className="border-b pb-4">
            <h1 className="mb-2">Region</h1>
            {locations.map(location => (
               <Link key={location.id} 
                  href={{
                     pathname: "/search",
                     query: {
                        ...searchParams,
                        city: location.name
                     }
                  }}>
                  <p className="font-light text-reg capitalize">{location.name}</p>
               </Link>
            ))}
         </div>
         <div className="border-b pb-4 mt-3">
            <h1 className="mb-2">Cuisine</h1>
            {cuisines.map(cuisine => (
               <Link key={cuisine.id} href={{
                  pathname: "/search",
                  query: {
                     ...searchParams,
                     cuisine: cuisine.name
                  }
               }}>
                  <p className="font-light text-reg capitalize">{cuisine.name}</p>
               </Link>
            ))}
         </div>
         <div className="mt-3 pb-4">
            <h1 className="mb-2">Price</h1>
            <div className="flex">
               <Link href={{
                  pathname: "/search",
                  query: {
                     ...searchParams,
                     price: PRICE.CHEAP
                  }
               }}>
                  <button className="border w-full text-reg font-light rounded-l p-2">
                           $
                  </button>
               </Link>
               <Link href={{
                  pathname: "/search",
                  query: {
                     ...searchParams,
                     price: PRICE.REGULAR
                  }
               }}>
                  <button
                     className="border-r border-t border-b w-full text-reg font-light p-2"
                  >
                           $$
                  </button>
               </Link>
               <Link href={{
                  pathname: "/search",
                  query: {
                     ...searchParams,
                     price: PRICE.EXPENSIVE
                  }
               }}>
                  <button
                     className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
                  >
                           $$$
                  </button>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default SearchSideBar