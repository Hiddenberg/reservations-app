import axios from "axios"
import { FormInputs } from "../app/components/AuthModal"
import { useContext, useEffect } from "react"
import { AuthenticationContext } from "../app/context/AuthContext"

export default function useAuth() {
   const {setAuthState} = useContext(AuthenticationContext)
   const SIGN_IN_ENDPOINT = "http://localhost:3000/api/auth/signin"
   const SIGN_UP_ENDPOINT = "http://localhost:3000/api/auth/signup"
   const LOGOUT_ENDPOINT = "http://localhost:3000/api/auth/logout"

   const signIn = async ({email, password}:{email: string, password: string}) => {
      setAuthState({loading: true, data: null, error: null})

      try {
         const response = await axios.post(SIGN_IN_ENDPOINT, {
            email,
            password
         })

         setAuthState({
            loading: false,
            data: response.data,
            error: null
         })
      } catch (error: any) {
         setAuthState({
            loading: false,
            data: null,
            error: error.response.data.errorMessage
         })
      }
   }

   const signUp = async (inputs: FormInputs) => {
      setAuthState({loading: true, data: null, error: null})

      try {
         console.log(inputs)
         const response = await axios.post(SIGN_UP_ENDPOINT, inputs)
         console.log(response)

         setAuthState({
            loading: false,
            data: response.data,
            error: null
         })
      } catch (error: any) {
         setAuthState({
            loading: false,
            data: null,
            error: error.response.data.errorMessage
         })
      }
   }

   const logout = async () => {
      try {
         await axios.get(LOGOUT_ENDPOINT)

         setAuthState({
            loading: false,
            data: null,
            error: null
         })
      } catch (error) {
         console.log(error)
      }
   }

   return {
      signIn,
      signUp,
      logout
   }
}