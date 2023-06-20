import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   const {slug, day, time, partySize} = req.query as {[key:string]:string}

   return res.json({
      slug,
      day,
      time,
      partySize
   })
}

// Endpoint: http://localhost:3000/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?partySize=4&day=2023-04-21&time=22:30:00.000Z
