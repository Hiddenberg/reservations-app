import Link from "next/link"
import { RestaurantSearchCardType } from "../page"
import Price from "../../components/Price"
import { calculateAverageReviews } from "../../../utils/numbers"
import Stars from "../../components/Stars"

function SearchRestaurantCard({restaurant}: {restaurant: RestaurantSearchCardType}) {
   return (
      <div className="border-b flex pb-5">
         
         <img
            src={restaurant.main_image}
            alt=""
            className="w-44 rounded"
         />
         <div className="pl-5">
            <h2 className="text-3xl">{restaurant.name}</h2>
            <div className="flex items-start">
               <Stars reviews={restaurant.reviews}/>
            </div>
            <div className="mb-9">
               <div className="font-light flex text-reg">
                  <Price price={restaurant.price}/>
                  <p className="mx-4">{restaurant.cuisine.name}</p>
                  <p className="mr-4">{restaurant.location.name}</p>
               </div>
            </div>
            <div className="text-red-600">
               <Link href={`/restaurant/${restaurant.slug}`}>
                  View more information
               </Link>
            </div>
         </div>
      </div>
   )
}

export default SearchRestaurantCard