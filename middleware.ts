import { NextMiddleware, NextRequest, NextResponse } from "next/server"
import * as jose from "jose"

export const middleware: NextMiddleware = async (req, event) => {
   console.log("*** MIDDLEWARE CALLED BEFORE ENDPOINT ***")

   const unauthorizedResponse = new NextResponse(
      JSON.stringify({
         errorMessage: "Unauthorized request"
      }),
      {
         status: 401,
         headers: {
            "content-type": "application/json"
         }
      }
   )

   const bearerToken = req.headers.get("authorization") || req.cookies.get("jwt")?.value
   if (!bearerToken) {
      return unauthorizedResponse
   }

   const token = bearerToken.split(" ")[1]
   if (!token) {
      return unauthorizedResponse
   }

   const secret = new TextEncoder().encode(process.env.JWT_SECRET)
   try {
      await jose.jwtVerify(token, secret)
   } catch (error) {
      return unauthorizedResponse
   }
}

// ↓ Here we add a config to tell nextJS to ONLY use this middleware with this matchers
export const config = {
   matcher: [
      "/api/auth/me"
   ]
}