import { NextApiRequest, NextApiResponse } from "next"

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

   return res.json({slug, day, time, partySize})
}