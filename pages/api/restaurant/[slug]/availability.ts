import { NextApiRequest, NextApiResponse } from "next"
import { times } from "../../../../data/times"

interface AvailabilityQueryParams {
   [key: string]: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const {slug, day, time, partySize} = req.query as AvailabilityQueryParams

   if (!day || !time || !partySize) {
      return res.status(400).json({
         errorMessage: "Invalid Request"
      })
   }

   const searchTimes = times.find(t => {
      return t.time === time
   })?.searchTimes

   if (!searchTimes) {
      return res.status(400).json({
         errorMessage: "Invalid data provided"
      })
   }

   return res.json(searchTimes)
}