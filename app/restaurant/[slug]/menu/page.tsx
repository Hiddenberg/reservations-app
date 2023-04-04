import NavBar from "../../../components/NavBar"
import RestaurantHeader from "../../components/RestaurantHeader"
import RestaurantMenu from "../../components/RestaurantMenu"
import RestaurantNavBar from "../../components/RestaurantNavBar"

function RestaurantMenuPage() {
   return (
      <>
         <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar  />
            <RestaurantMenu />
         </div>
      </>
   )
}

export default RestaurantMenuPage