"use client"

import { ChangeEventHandler, useEffect, useState } from "react"

interface ReserveFormInputs {
   bookerFirstName: string
   bookerLastName: string
   bookerPhone: string
   bookerEmail: string
   bookerOccasion: string
   bookerRequest: string
}

function ReserveForm() {
   const [inputs, setInputs] = useState<ReserveFormInputs>({
      bookerFirstName: "",
      bookerLastName: "",
      bookerPhone: "",
      bookerEmail: "",
      bookerOccasion: "",
      bookerRequest: ""
   })
   const [buttonDisabled, setButtonDisabled] = useState(true)

   useEffect(() => {
      let allInputsFilled = true
      for (let input in inputs) {
         if (input === "bookerOccasion" || input === "bookerRequest") {
            continue
         }

         if (inputs[input as keyof typeof inputs].trim() === "") {
            allInputsFilled = false
            break
         }
      }

      setButtonDisabled(!allInputsFilled)
   }, [inputs])

   const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setInputs(() => ({
         ...inputs,
         [e.target.name]: e.target.value
      }))
   }

   return (
      <div className="mt-10 flex flex-wrap justify-between w-[660px]">
         <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleInputChange}
         />
         <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="bookerLastName"
            value={inputs.bookerLastName}
            onChange={handleInputChange}
         />
         <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="bookerPhone"
            value={inputs.bookerPhone}
            onChange={handleInputChange}
         />
         <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerEmail"
            value={inputs.bookerEmail}
            onChange={handleInputChange}
         />
         <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            value={inputs.bookerOccasion}
            onChange={handleInputChange}
         />
         <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerRequest"
            value={inputs.bookerRequest}
            onChange={handleInputChange}
         />
         <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300" disabled={buttonDisabled}>
            Complete reservation
         </button>
         <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
         </p>
      </div>
   )
}

export default ReserveForm