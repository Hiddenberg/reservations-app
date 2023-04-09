import RestaurantMenu from "../../components/RestaurantMenu"
import RestaurantNavBar from "../../components/RestaurantNavBar"

function RestaurantMenuPage({params: {slug}}: {params: {slug: string}}) {
   return (
      <>
         <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar slug={slug}/>
            <RestaurantMenu />
         </div>
      </>
   )
}

export default RestaurantMenuPage