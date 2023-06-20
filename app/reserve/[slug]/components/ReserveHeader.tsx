import { time } from "console"
import fortmatTime from "../../../../utils/formatTime"

function ReserveHeader({image: imageUrl, name, partySize, time, dateString}: {image: string, name: string, partySize: string, time: string, dateString: string}) {
   const date = new Date(dateString)
   return (
      <div>
         <h3 className="font-bold">You're almost done!</h3>
         <div className="mt-5 flex">
            <img
               src={imageUrl}
               alt=""
               className="w-32 h-18 rounded"
            />
            <div className="ml-4">
               <h1 className="text-3xl font-bold">
                  {name}
               </h1>
               <div className="flex mt-3">
                  <p className="mr-6">{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</p>
                  <p className="mr-6">{fortmatTime(time)}</p>
                  <p className="mr-6">{partySize} {parseInt(partySize) > 1 ? "people" : "person"}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ReserveHeader