"use client"

import { ChangeEventHandler, MouseEventHandler, useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import FormInputs from './FormInputs'
import useAuth from '../../hooks/useAuth'
import { AuthenticationContext } from '../context/AuthContext'
import { CircularProgress } from '@mui/material'

const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
   borderRadius: "0.25rem"
}

export interface FormInputs {
   firstName: string
   lastName: string
   email: string
   phone: string
   city: string
   password: string
}

export default function AuthModal({isSignIn}:{isSignIn:boolean}) {
   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)
   const {signIn, signUp} = useAuth()
   const {loading, error} = useContext(AuthenticationContext)

   const [inputs, setInputs] = useState<FormInputs>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      password: ""
   })

   useEffect(() => {
      if (isSignIn) {
         if (inputs.password && inputs.email) {
            setButtonDisabled(false)
         } else {
            setButtonDisabled(true)
         }
      } else {
         let allInputsFilled = true

         // Iterating over each input and checking if any of them is empty
         for (const key in inputs as {[key: string]: any}) {
            if (!inputs[key as keyof FormInputs]) {
               allInputsFilled = false
               break
            }
         }
   
         if (allInputsFilled) {
            setButtonDisabled(false)
         } else {
            setButtonDisabled(true)
         }
      }
   }, [inputs, isSignIn])

   const [buttonDisabled, setButtonDisabled] = useState(true)
   const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setInputs(() => ({
         ...inputs,
         [e.target.name]: e.target.value
      }))
   }

   const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault()

      if(isSignIn) {
         signIn(inputs)
      } else {
         signUp(inputs)
      }
   }

   return (
      <div>
         {isSignIn ?
            <button onClick={handleOpen} className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
               Sign In
            </button> :
            <button onClick={handleOpen} className="border p-1 px-4 rounded">
               Sign Up
            </button>
         }
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <div className="p-2">
                  <div className="uppercase font-bold text-center pb-2 border-b mb-2" >
                     <p className="text-small">
                        {isSignIn ? "Sign In" : "Create Account"}
                     </p>
                  </div>
                  <div>
                     {loading ?
                        <div className='flex justify-center pt-4'>
                           <CircularProgress /> 
                        </div>
                        :
                        <>
                           <p className='text-xl m-auto text-center mb-4'>
                              {isSignIn ? "Login to your account" : "Create a new account"}
                           </p>
                           <form className="space-y-3 flex flex-col justify-center">
                              <FormInputs isSignIn={isSignIn} handleInputChange={handleInputChange}/>
                              <button
                                 className="bg-blue-500 text-white px-3 py-2 rounded mx-auto w-40 cursor-pointer disabled:bg-gray-400 disabled:cursor-default"
                                 disabled={buttonDisabled}
                                 onClick={handleClick}
                              >{isSignIn ? "Sign In": "Sign Up"}</button>
                           </form>
                        </>
                     }
                  </div>
               </div>
            </Box>
         </Modal>
      </div>
   )
}
