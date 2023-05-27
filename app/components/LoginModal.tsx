"use client"

import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import SignUpForm from './SignUpForm'

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

export default function LoginModal({isSignIn}:{isSignIn:boolean}) {
   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

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
                     <p className='text-xl m-auto text-center mb-4'>
                        {isSignIn ? "Login to your account" : "Create a new account"}
                     </p>
                     {isSignIn ?
                        "" :
                        <SignUpForm />
                     }
                  </div>
               </div>
            </Box>
         </Modal>
      </div>
   )
}
