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
   if (!searchTimesWithTables) {
      return res.status(400).json({
         errorMessage: "No availability"
      })
   }

   const searchTimeWithTables = searchTimesWithTables.find(t => t.date.toISOString() === new Date(`${day}T${time}`).toISOString())
   if (!searchTimeWithTables) {
      return res.status(400).json({
         errorMessage: "No availability"
      })
   }

   const tablesCount: {
      2: number[]
      4: number[]
   } = {
      2: [],
      4: []
   }
   searchTimeWithTables.tables.forEach(table => {
      if (table.seats === 2) {
         tablesCount[2].push(table.id)
      } else {
         tablesCount[4].push(table.id)
      }
   })

   console.log(tablesCount)

   const tablesToBook: number[] = []

   let seatsRemaining = parseInt(partySize)
   while (seatsRemaining > 0) {
      if (seatsRemaining >= 3) {
         if (tablesCount[4].length) {
            tablesToBook.push(tablesCount[4][0])
            tablesCount[4].shift()
            seatsRemaining -= 4
         } else {
            tablesToBook.push(tablesCount[2][0])
            tablesCount[2].shift()
            seatsRemaining -= 2
         }
      } else {
         if (tablesCount[2].length) {
            tablesToBook.push(tablesCount[2][0])
            tablesCount[2].shift()
            seatsRemaining -= 2
         } else {
            tablesToBook.push(tablesCount[4][0])
            tablesCount[4].shift()
            seatsRemaining -= 4
         }
      }
   }

   return res.json({tablesCount, tablesToBook})
}

// Endpoint: http://localhost:3000/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?partySize=4&day=2023-04-21&time=22:30:00.000Z
