import ReserveHeader from "./components/ReserveHeader"
import ReserveForm from "./components/ReserveForm"
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug: string) => {
   const restaurant = await prisma.restaurant.findUnique({
      where: {
         slug
      }
   })

   if (!restaurant) {
      return notFound()
   }

   return restaurant
}

async function ReservationPage({
   params: {slug},
   searchParams: {date, partySize}
}: {params: {slug: string}, searchParams: {date: string, partySize: string}}) {
   const restaurant = await fetchRestaurantBySlug(slug)

   const [day, time] = date.split("T")
   return (
      <>
         <div className="border-t h-screen">
            <div className="py-9 w-3/5 m-auto">
               <ReserveHeader image={restaurant.main_image} name={restaurant.name} partySize={partySize} time={time} dateString={date}/> 
               <ReserveForm day={day} partySize={partySize} slug={slug} time={time} />
            </div>
         </div>
      </>
   )
}

export default ReservationPage