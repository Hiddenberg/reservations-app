function SignUpForm() {
   return ( 
      <form className="space-y-3 flex flex-col justify-center" action="">
         <div className="flex space-x-2">
            <input type="text" className="border rounded p-2 py-3 w-1/2" placeholder="First Name"/>
            <input type="text" className="border rounded p-2 py-3 w-1/2" placeholder="Last Name"/>
         </div>
         <input type="email" className="border rounded p-2 py-3 w-full" placeholder="Email"/>
         <input type="tel" className="border rounded p-2 py-3 w-full" placeholder="Phone"/>
         <input type="password" className="border rounded p-2 py-3 w-full" placeholder="Password"/>
         <button className="bg-blue-500 text-white px-3 py-2 rounded mx-auto w-40 cursor-pointer">Sign In</button>
      </form>
   )
}

export default SignUpForm