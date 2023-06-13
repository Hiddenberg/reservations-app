import axios from "axios"
import { FormInputs } from "../app/components/AuthModal"

export default function useAuth() {
   const SIGN_IN_ENDPOINT = "http://localhost:3000/api/auth/signin"
   const SIGN_UP_ENDPOINT = "http://localhost:3000/api/auth/signup"

   const signIn = async ({email, password}:{email: string, password: string}) => {
      try {
         const response = await axios.post(SIGN_IN_ENDPOINT, {
            email,
            password
         })

         console.log(response)
      } catch (error) {
         console.log(error)
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