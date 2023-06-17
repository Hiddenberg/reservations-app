import axios from "axios"
import { useState } from "react"

export default function useAvailability() {
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [availabilities, setAvailabilities] = useState(null)

   const fetchAvailabilities = async ({
      slug,
      partySize,
      day,
      time
   }: {[key: string]: string}) => {
      setLoading(true)

      try {
         const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`)

         setAvailabilities(response.data)
         setLoading(false)
      } catch (error: any) {
         setError(error.response.data.errorMessage)
      }
   }

   return {loading, availabilities, error}
}