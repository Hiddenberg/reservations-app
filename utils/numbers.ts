import { Review } from "@prisma/client"

export function calculateAverageReviews(reviews: Review[]) {
   let restaurantAverageReview = 0

   if (reviews.length > 0) {
      restaurantAverageReview = Math.floor(reviews.reduce((prev, review) => review.rating + prev, 0) / reviews.length)
   }

   return restaurantAverageReview
}