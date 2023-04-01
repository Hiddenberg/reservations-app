"use client"

import { useRouter } from "next/navigation"
import { ChangeEventHandler, MouseEventHandler, useState } from "react"

function SearchBar() {
   const router = useRouter()
   const [location, setLocation] = useState("")

   const handleSearchButton: MouseEventHandler<HTMLButtonElement> = (e) => {
      if (location == "banana") {
         return
      }

      router.push("/search")
   }
   const handleSearchChange: ChangeEventHandler<HTMLInputElement>  = (e) => {
      setLocation(e.target.value)
   }

   return (
      <div className="text-left text-lg py-3 m-auto flex justify-center">
         <input
            className="rounded  mr-3 p-2 w-[450px]"
            type="text"
            placeholder="State, city or town"
            value={location}
            onChange={handleSearchChange}
         />
         <button className="rounded bg-red-600 px-9 py-2 text-white"
            onClick={handleSearchButton}>
            Let's go
         </button>
      </div>
   )
}

export default SearchBar