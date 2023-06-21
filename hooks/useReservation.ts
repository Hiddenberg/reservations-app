import axios from "axios"
import { useState } from "react"
import { BookerInfo } from "../app/reserve/[slug]/components/ReserveForm"

export default function useReservation() {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const createReservation = async ({slug, partySize, day, time, bookerInfo}: {slug:string, partySize: string, day:string, time:string, bookerInfo: BookerInfo}) => {
      setLoading(true)

      try {
         const response = await axios.post(`http://localhost:3000/api/restaurant/${slug}/reserve?day=${day}&time=${time}&partySize=${partySize}`, bookerInfo)

         setLoading(false)
      } catch (error: any) {
         setError(error.response.data.errorMessage)
         setLoading(false)
      }
   }

   return {createReservation, loading, error}
}