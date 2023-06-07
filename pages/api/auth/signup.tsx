import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method == "POST") {
      const {firstName, lastName, email, phone, city, password} = req.body

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

      res.status(200).json({
         hello: "You passed the validation!"
      })
   }
}