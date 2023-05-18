import { Review } from "@prisma/client"

export function calculateAverageReviews(reviews: Review[], float?:boolean) {
   let restaurantAverageReview = 0

   if (reviews.length > 0) {
      restaurantAverageReview = reviews.reduce((prev, review) => review.rating + prev, 0) / reviews.length
   }

   if (float) {
      return restaurantAverageReview
   }

   return Math.floor(restaurantAverageReview)
}