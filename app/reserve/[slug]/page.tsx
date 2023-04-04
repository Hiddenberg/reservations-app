import Link from "next/link"
import NavBar from "../../components/NavBar"
import ReserveHeader from "./components/ReserveHeader"
import ReserveForm from "./components/ReserveForm"

function ReservationPage() {
   return (
      <>
         <div className="border-t h-screen">
            <div className="py-9 w-3/5 m-auto">
               <ReserveHeader /> 
               <ReserveForm />
            </div>
         </div>
      </>
   )
}

export default ReservationPage