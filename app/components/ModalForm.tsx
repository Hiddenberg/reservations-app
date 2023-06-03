import { ChangeEventHandler } from "react"

function ModalForm({isSignIn, handleInputChange}: {isSignIn:boolean, handleInputChange: ChangeEventHandler<HTMLInputElement>}) {
   return (
      <form onSubmitCapture={e => {e.preventDefault(); console.log(e)}} className="space-y-3 flex flex-col justify-center">
         {isSignIn ? 
            <>
               <input onChange={handleInputChange} name="email" type="email" className="border rounded p-2 py-3 w-full" placeholder="Email"/>
               <input onChange={handleInputChange} name="password" type="password" className="border rounded p-2 py-3 w-full" placeholder="Password"/>
               <button className="bg-blue-500 text-white px-3 py-2 rounded mx-auto w-40 cursor-pointer">Sign In</button>
            </> :
            <>
               <div className="flex space-x-2">
                  <input onChange={handleInputChange} name="firstName" type="text" className="border rounded p-2 py-3 w-1/2" placeholder="First Name"/>
                  <input onChange={handleInputChange} name="lastName" type="text" className="border rounded p-2 py-3 w-1/2" placeholder="Last Name"/>
               </div>
               <input onChange={handleInputChange} name="email" type="email" className="border rounded p-2 py-3 w-full" placeholder="Email"/>
               <input onChange={handleInputChange} name="phone" type="tel" className="border rounded p-2 py-3 w-full" placeholder="Phone"/>
               <input onChange={handleInputChange} name="city" type="text" className="border rounded p-2 py-3 w-full" placeholder="City"/>
               <input onChange={handleInputChange} name="password" type="password" className="border rounded p-2 py-3 w-full" placeholder="Password"/>
               <button className="bg-blue-500 text-white px-3 py-2 rounded mx-auto w-40 cursor-pointer">Sign Up</button>
            </>
         }
      </form>
   )
}

export default ModalForm