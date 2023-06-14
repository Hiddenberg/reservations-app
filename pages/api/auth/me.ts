import { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const bearerToken = req.headers.authorization || req.cookies["jwt"]
   if (!bearerToken) {
      return res.status(401).json({
         errorMessage: "Unauthorized request"
      }) 
   }
   const token = bearerToken.split(" ")[1]

   if (!token) {
      return res.status(401).json({
         errorMessage: "Unauthorized request"
      })
   }
   const payload = jwt.decode(token) as {email?: string, exp?: number}

   if (!payload.email) {
      return res.status(401).json({
         errorMessage: "Unauthorized request"
      })
   }

   const user = await prisma.user.findUnique({
      where: {
         email: payload.email
      },
      select: {
         id: true,
         first_name: true,
         last_name: true,
         city: true,
         email: true,
         phone: true,
      }
   })

   if (user) {
      const clientUser = {
         id: user.id,
         firstName: user.first_name,
         lastName: user.last_name,
         email: user.email,
         city: user.city,
         phone: user.phone
      }

      return res.status(200).json(clientUser)
   }

   res.status(200).json({
      message: "Not sure how you got here :D"
   })
}