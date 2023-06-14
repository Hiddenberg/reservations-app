"use client"
import axios from "axios"
import React, { useState, createContext, useEffect } from "react"

interface User {
   id: number
   firstName: string
   lastName: string
   email: string
   city: string
   phone: string
}

interface AuthState {
   loading: boolean
   data: User | null
   error: string | null
}
interface AuthStateSetter extends AuthState{
   setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}


export const AuthenticationContext = createContext<AuthStateSetter>({
   loading: false,
   data: null,
   error: null,
   setAuthState: () => {}
})


export default function AuthContext({children}: {children: React.ReactNode}) {
   const [authState, setAuthState] = useState<AuthState>({
      loading: true,
      data: null,
      error: null,
   })


   useEffect(() => {
      if (authState.data == null) {
         setAuthState({
            loading: true,
            data: null,
            error: null
         })

         console.log("activating user useeffect")
         const fetchUser = async() => {
            const ME_ENDPOINT = "http://localhost:3000/api/auth/me"

            try {
               const response = await axios.get(ME_ENDPOINT)
               console.log(response)

               setAuthState({
                  loading: false,
                  data: response.data,
                  error: null
               })
            } catch (error: any) {
               console.log("no token found")
               setAuthState({
                  loading: false,
                  data: null,
                  error: null
               })
            }
         }

         fetchUser()
      }
   }, [authState.data])

   return (
      <AuthenticationContext.Provider value={{...authState, setAuthState}}>
         {children}
      </AuthenticationContext.Provider>
   )
}