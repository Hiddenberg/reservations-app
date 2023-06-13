import axios, { AxiosError } from "axios"
import { FormInputs } from "../app/components/AuthModal"
import { useContext } from "react"
import { AuthenticationContext } from "../app/context/AuthContext"

export default function useAuth() {
   const {setAuthState} = useContext(AuthenticationContext)
   const SIGN_IN_ENDPOINT = "http://localhost:3000/api/auth/signin"
   const SIGN_UP_ENDPOINT = "http://localhost:3000/api/auth/signup"

   const signIn = async ({email, password}:{email: string, password: string}) => {
      setAuthState({loading: true, data: null, error: null})
      try {
         const response = await axios.post(SIGN_IN_ENDPOINT, {
            email,
            password
         })

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
   const signUp = async (inputs: FormInputs) => {
      // try {
      //    const response = await axios.post(SIGN_UP_ENDPOINT, inputs)
      // } catch (error) {
         
      // }
   }

   return {
      signIn,
      signUp
   }
}