import { ChangeEventHandler } from "react"

function FormInputs({isSignIn, handleInputChange}: {isSignIn:boolean, handleInputChange: ChangeEventHandler<HTMLInputElement>}) {
   if (isSignIn) {
      return (
         <>
            <input onChange={handleInputChange} name="email" type="email" className="border rounded p-2 py-3 w-full" placeholder="Email"/>
            <input onChange={handleInputChange} name="password" type="password" className="border rounded p-2 py-3 w-full" placeholder="Password"/>
         </>
      )
   } else {
      return (
         <>
            <div className="flex space-x-2">
               <input onChange={handleInputChange} name="firstName" type="text" className="border rounded p-2 py-3 w-1/2" placeholder="First Name"/>
               <input onChange={handleInputChange} name="lastName" type="text" className="border rounded p-2 py-3 w-1/2" placeholder="Last Name"/>
            </div>
            <input onChange={handleInputChange} name="email" type="email" className="border rounded p-2 py-3 w-full" placeholder="Email"/>
            <input onChange={handleInputChange} name="phone" type="tel" className="border rounded p-2 py-3 w-full" placeholder="Phone"/>
            <input onChange={handleInputChange} name="city" type="text" className="border rounded p-2 py-3 w-full" placeholder="City"/>
            <input onChange={handleInputChange} name="password" type="password" className="border rounded p-2 py-3 w-full" placeholder="Password"/>
         </>
      )
   }
}

export default FormInputs