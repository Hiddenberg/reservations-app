import { PRICE } from "@prisma/client"

function Price({price}: {price: PRICE}) {
   if (price === PRICE.CHEAP) {
      return <>
         <span>$$</span><span className="text-gray-400">$$</span>
      </>
   }
   if (price === PRICE.REGULAR) {
      return <>
         <span>$$$</span><span className="text-gray-400">$</span>
      </>
   }
   if (price === PRICE.EXPENSIVE) {
      return <>
         <span>$$$$</span>
      </>
   }

   return <>
      <span>????</span>
   </>
}

export default Price