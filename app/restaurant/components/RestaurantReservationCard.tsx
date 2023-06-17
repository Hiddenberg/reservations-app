"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import { times } from "../../../data/times"
import useAvailability from "../../../hooks/useAvailability"
import { CircularProgress } from "@mui/material"


function RestaurantReservationCard({openTime, closeTime, slug}: {openTime: string, closeTime: string, slug:string}) {
   const {loading, availabilities, error, fetchAvailabilities} = useAvailability()

   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
   const [time, setTime] = useState(openTime)
   const [partySize, setPartySize] = useState("2")
   const [day, setDay] = useState(new Date().toISOString().split("T")[0])

   const handleDateChange = (date: Date | null) => {
      if (date) {
         const dayString = date.toISOString().split("T")[0]
         setDay(dayString)
         setSelectedDate(date)
         return
      }
      setSelectedDate(null)
      return
   }

   const onClickHandler = async() => {
      fetchAvailabilities({
         slug: slug,
         time: time,
         day: day,
         partySize: partySize
      })
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
      <div className="bg-white rounded p-3 shadow">
         <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
            {time}
         </div>
         <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="partySize" value={partySize} onChange={e => setPartySize(e.target.value)} className="py-3 border-b font-light" id="">
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
               <select name="" value={time} onChange={e => setTime(e.target.value)} id="" className="py-3 border-b font-light">
                  {filterTimesByRestaurantWindow().map(time => (
                     <option key={time.displayTime} value={time.time}>{time.displayTime}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 disabled:bg-gray-400" disabled={loading} onClick={onClickHandler}>
               {loading ? 
                  <CircularProgress /> :
                  "Find a Time"
               }
            </button>
         </div>
         {availabilities && 
            <div className="mt-4">
               <p className="text-reg">"Select A Time"</p>
               <div className="flex flex-wrap mt-2 space-x-1 space-y-1">
                  {availabilities.map(time => {
                     if (!time.available) {
                        return <button className="p-2 bg-gray-600 rounded text-white text-center font-bold cursor-pointer w-20" key={time.time}>{time.time}</button>
                     }
                     return <button className="p-2 bg-red-600 rounded text-white text-center font-bold cursor-pointer w-20" key={time.time}>{time.time}</button>
                  })}
               </div>
            </div>
         }
      </div>
   )
}

export default RestaurantReservationCard