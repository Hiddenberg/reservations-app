import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   res.status(200).setHeader("Set-Cookie", "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/; HttpOnly").json({message: "you should be logged out now ;)"})
}