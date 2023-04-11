import { Item } from "@prisma/client"
import MenuCard from "./MenuCard"

function RestaurantMenu({menu}: {menu: Item[]}) {
   return (
      <main className="bg-white mt-5">
         <div>
            <div className="mt-4 pb-1 mb-1">
               <h1 className="font-bold text-4xl">Menu</h1>
            </div>
            <div className="flex flex-wrap justify-between">
               {menu.length > 0 ? menu.map(item => (
                  <MenuCard key={item.id} item={item}/>
               )):
                  <p>This restaurant doesn't have a menu</p>
               }
            </div>
         </div>
      </main>
   )
}

export default RestaurantMenu