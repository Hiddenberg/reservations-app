import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import * as jose from "jose"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method == "POST") {
      const {firstName, lastName, email, phone, city, password} = req.body
      console.log(firstName, lastName, email, phone, city, password)

      const errors: string[] = []

      const validationSchema = [
         {
            valid: validator.isLength(firstName, {
               min: 1,
               max: 35
            }),
            errorMessage: "First name is invalid"
         },
         {
            valid: validator.isLength(lastName, {
               min: 1,
               max: 35
            }),
            errorMessage: "Last name is invalid"
         },
         {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid"
         },
         {
            valid: validator.isMobilePhone(phone),
            errorMessage: "Phone is invalid"
         },
         {
            valid: validator.isLength(city, {
               min: 1
            }),
            errorMessage: "City is invalid"
         },
         {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is not strong enough"
         },
      ]

      validationSchema.forEach(input => {
         if (!input.valid) {
            errors.push(input.errorMessage)
         }
      })

      if (errors.length > 0) {
         return res.status(400).json({errorMessage: errors[0]})
      }

      const userWithEmail = await prisma.user.findUnique({
         where: {
            email
         }
      })

      if (userWithEmail) {
         return res.status(400).json({
            errorMessage: `Email ${email} is already in use`
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
         data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            city: city,
            password: hashedPassword
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

         const secret = new TextEncoder().encode(process.env.JWT_SECRET)
         const token = await new jose.SignJWT({email: user.email})
            .setProtectedHeader({alg: "HS256"})
            .setExpirationTime("24h")
            .sign(secret)
         return res.status(200).setHeader("Set-Cookie", `jwt=Bearer ${token}; Path=/; HttpOnly`).json(clientUser)
      }

      res.status(200).json({
         hello: "You passed the validation! "
      })
   }
}