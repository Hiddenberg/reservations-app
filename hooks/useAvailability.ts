import axios from "axios"
import { useState } from "react"

interface Availability {
   time: string;
   available: boolean;
}

export default function useAvailability() {
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [availabilities, setAvailabilities] = useState<Availability[] | null>(null)

   const fetchAvailabilities = async ({slug, partySize, day, time}: {slug:string, partySize: string, day:string, time:string}) => {
      setLoading(true)

      try {
         const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`)

         console.log(response.data)
         setAvailabilities(() => response.data)
         setLoading(false)
      } catch (error: any) {
         setError(error.response.data.errorMessage)
         setLoading(false)
      }
   }

   return {loading, availabilities, error, fetchAvailabilities}
}