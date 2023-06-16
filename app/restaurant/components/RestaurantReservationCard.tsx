"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import { times } from "../../../data/times"


function RestaurantReservationCard({openTime, closeTime}: {openTime: string, closeTime: string}) {
   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
   const handleDateChange = (date: Date | null) => {
      if (date) {
         setSelectedDate(date)
         return
      }
      setSelectedDate(null)
      return
   }

   const filterTimesByRestaurantWindow = () => {
      const timesInWindow = []

      let isWithinWindow = false
      for (let i = 0; i < times.length; i++) {
         const time = times[i]

         if (time.time === openTime) {
            isWithinWindow = true
         }
         if (isWithinWindow) {
            timesInWindow.push(time)
         }
         if (time.time === closeTime) {
            isWithinWindow = false
            break
         }
      }

      return timesInWindow
   }

   return (
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
         <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
         </div>
         <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="partySize" className="py-3 border-b font-light" id="">
               {new Array(10).fill(1).map((_, i) => {
                  const n = i+1
                  return <option key={i} value={n}>{n} {n > 1 ? "people" : "person"}</option>
               })}
            </select>
         </div>
         <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
               <label htmlFor="">Date</label>
               <DatePicker selected={selectedDate} onChange={handleDateChange} className="py-3 border-b font-light text-reg w-24" dateFormat="MMMM d" wrapperClassName="w-[48%]"/>
               <input type="text" className="py-3 border-b font-light w-28" />
            </div>
            <div className="flex flex-col w-[48%]">
               <label htmlFor="">Time</label>
               <select name="" id="" className="py-3 border-b font-light">
                  {filterTimesByRestaurantWindow().map(time => (
                     <option key={time.displayTime} value={time.time}>{time.displayTime}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
               Find a Time
            </button>
         </div>
      </div>
   )
}

export default RestaurantReservationCard