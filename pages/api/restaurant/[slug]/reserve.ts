import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import findAvailableTables from "../../../../services/restaurant/findAvailableTables"

const prisma = new PrismaClient

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const {slug, day, time, partySize} = req.query as {[key:string]:string}

   const restaurant = await prisma.restaurant.findUnique({
      where: {
         slug: slug,
      },
      select: {
         tables: true,
         open_time: true,
         close_time: true,
      }
   })

   if (!restaurant) {
      return res.status(404).json({
         errorMessage: "Restaurant not found"
      })
   }

   if (new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)) {
      return res.status(400).json({
         errorMessage: "Restaurant not open at this time"
      })
   }

   const searchTimesWithTables = await findAvailableTables({day, time, restaurant}, res)


   return res.json(searchTimesWithTables)
}

// Endpoint: http://localhost:3000/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?partySize=4&day=2023-04-21&time=22:30:00.000Z
