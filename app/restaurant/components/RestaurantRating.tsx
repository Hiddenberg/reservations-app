import { Review } from "@prisma/client"
import Stars from "../../components/Stars"
import { calculateAverageReviews } from "../../../utils/numbers"

function RestaurantRating({reviews}: {reviews:Review[]}) {
   let reviewAverage = calculateAverageReviews(reviews, true)

   return (
      <div className="flex items-center mt-2">
         <Stars reviews={reviews}/>
         <p className="text-reg ml-3">{reviewAverage}</p>
         <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
   )
}

export default RestaurantRating