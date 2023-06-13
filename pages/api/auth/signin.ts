import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as jose from "jose"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === "POST") {
      const {email, password} = req.body

      const validationSchema = [
         {
            valid: validator.isEmail(email),
            errorMessage: "Email not found"
         },
         {
            valid: validator.isLength(password, {min: 1}),
            errorMessage: "Password can not be empty"
         }
      ]

      for (const input of validationSchema) {
         if (!input.valid) {
            return res.status(400).json({errorMessage: input.errorMessage})
         }
      }

      const userWithEmail = await prisma.user.findUnique({
         where: {
            email: email
         }
      })

      if (userWithEmail === null) {
         return res.status(401).json({
            errorMessage: "Email or password is invalid"
         })
      }

      const passwordMatches = await bcrypt.compare(password, userWithEmail.password)

      if (!passwordMatches) {
         return res.status(401).json({
            errorMessage: "Email or password is invalid"
         })
      }

      const secret = new TextEncoder().encode(process.env.JWT_SECRET)
      const token = await new jose.SignJWT({email: userWithEmail.email})
         .setProtectedHeader({alg: "HS256"})
         .setExpirationTime("24h")
         .sign(secret)
      return res.status(200).json({
         token: token
      })
   }

   return res.status(404).json({
      errorMessage: "Unknown endpoint"
   })
}