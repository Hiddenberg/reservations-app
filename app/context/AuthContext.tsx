"use client"
import React, { useState, createContext } from "react"

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
      loading: false,
      data: null,
      error: null,
   })

   return (
      <AuthenticationContext.Provider value={{...authState, setAuthState}}>
         {children}
      </AuthenticationContext.Provider>
   )
}