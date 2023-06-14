"use client"
import Link from "next/link"
import AuthModal from "./AuthModal"
import { useContext, useEffect, useState } from "react"
import { AuthenticationContext } from "../context/AuthContext"
import useAuth from "../../hooks/useAuth"

function NavBar() {
   const {loading, data} = useContext(AuthenticationContext)
   const {logout} = useAuth()
   
   const [initialLoading, setInitialLoading] = useState(true)
   useEffect(() => {
      if (!loading && data) {
         setInitialLoading(false)
      }
      if (!loading && !data) {
         setInitialLoading(false)
      }
      console.log(data)
   },[data, loading])

   return (
      <nav className="bg-white p-2 flex justify-between">
         <Link href="" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
         {data != null && <h1>Bienvenido {data?.firstName}</h1>}
         <div>
            {!initialLoading &&
               <div className="flex">
                  {data === null ?
                     <>
                        <AuthModal isSignIn={true}/>
                        <AuthModal isSignIn={false}/>
                     </> : 
                     <button onClick={() => {logout()}} className="bg-red-600 text-white border p-1 px-4 rounded mr-3">Logout</button>
                  }
               </div>
            }
         </div>
      </nav>
   )
}

export default NavBar