import { Review } from "@prisma/client"
import { calculateAverageReviews } from "../../utils/numbers"

function Stars({reviews}: {reviews: Review[]}) {
   let restaurantAverageReview = calculateAverageReviews(reviews)

   let starsString = ""
   for (let i=0; i < restaurantAverageReview; i++) {
      starsString += "★"
   }

   return (
      <div className="flex text-l">
         {starsString}{restaurantAverageReview >= 4 && <b className="ml-1">Awesome</b>}
      </div>
   )
}

export default Stars