"use client"

function RestaurantNotFound() {
   return (
      <div className="h-screen bg-gray-200 flex flex-column justify-center items-center">
         <div className="p-4 bg-white rounded-md flex flex-col items-center">
            <h1 className="text-5xl text-red-500 mb-4">Nothing here!</h1>
            <h2 className="text-2xl ">We couldn't find this restaurant :(</h2>
         </div>
      </div>
   )
}

export default RestaurantNotFound