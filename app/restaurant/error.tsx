"use client"

function RestaurantError({error}: {error: Error}) {
   return (
      <div className="h-screen bg-gray-200 flex flex-column justify-center items-center">
         <div className="p-4 bg-white rounded-md">
            <h1 className="text-5xl text-red-500 mb-2">An error has occurred</h1>
            <p className="text-center text-lg">{error.message}</p>
         </div>
      </div>
   )
}

export default RestaurantError