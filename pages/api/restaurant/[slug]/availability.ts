import { NextApiRequest, NextApiResponse } from "next"
import { times } from "../../../../data/times"
import { PrismaClient } from "@prisma/client"
import { table } from "console"
import findAvailableTables from "../../../../services/restaurant/findAvailableTables"

interface AvailabilityQueryParams {
   [key: string]: string
}

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const {slug, day, time, partySize} = req.query as AvailabilityQueryParams

   if (!day || !time || !partySize) {
      return res.status(400).json({
         errorMessage: "Invalid Request"
      })
   }

   const restaurant = await prisma.restaurant.findUnique({
      where: {
         slug
      },
      select: {
         tables: true,
         open_time: true,
         close_time: true
      }
   })
   
   if (!restaurant) {
      return res.status(400).json({
         errorMessage: "Invalid data provided"
      })
   }

   const searchTimesWithTables = await findAvailableTables({day, time, restaurant}, res)

   if (!searchTimesWithTables) {
      return res.status(400).json({
         errorMessage: "Invalid data provided"
      })
   }
   const availabilities = searchTimesWithTables.map(t => {
      const sumSeats = t.tables.reduce((sum,  table) => {
         return sum + table.seats
      }, 0)

      return {
         time: t.time,
         available: sumSeats >= parseInt(partySize)
      }
   }).filter(availability => {
      const availabilityTime = new Date(`${day}T${availability.time}`)
      const timeIsAfterOpeningHours = availabilityTime >= new Date(`${day}T${restaurant.open_time}`)
      const timeIsBeforeClosingHours = availabilityTime <= new Date(`${day}T${restaurant.close_time}`)

      return timeIsAfterOpeningHours && timeIsBeforeClosingHours
   })
   return res.json(availabilities)
}

