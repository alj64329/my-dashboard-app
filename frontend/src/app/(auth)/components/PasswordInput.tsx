'use client'

import { useSignupData } from "@/src/stores/signup.store"
import { Role } from "@/src/types/index.types"
import { validatePassword } from "@/src/utils/validatePassword"
import { useEffect, useState } from "react"



const PasswordInput = () => {
    const signupData = useSignupData(s=>s.signupData)

    const [password1, setPassword1] =useState("")
    const [password2, setPassword2] =useState("")
    const [message1, setMessage1] = useState("")
    const [message2, setMessage2] = useState("")

    //initialize dashboard route
    let dashboardRoute :string

    //data parameter is neeed to sign up company
    const handleSignup =async(e:React.FormEvent)=>{
        e.preventDefault()

        if(signupData.role===Role.admin){

        }else if(signupData.role ===Role.employee){

        }
    }

    useEffect(()=>{
        setMessage1(validatePassword(password1))
    }, [password1])

    useEffect(()=>{
        if(password1!==password2){
            setMessage2("Both password need to match")
            return
        }else{
            setMessage2("")
            return
        }
    },[password2])

  return (
        <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center pt-20 pb-15 px-8">
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-12 px-16">
                <form 
                onSubmit={handleSignup} 
                className="flex flex-col gap-5 text-grey-500">
                    <div>
                        <ul className='text-sm list-disc w-fit mx-auto text-main-green'>
                            <li>Minimum 8 charcters</li>
                            <li>1 Number or 1 Special character</li>
                            <li>At least 1 uppercase</li>
                            <li>At least 1 lowercase</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Create a password</label>
                        <input type="password" name="password1" id="password1" 
                        placeholder="Enter your password"
                        value={password1}
                        onChange={(e)=>setPassword1(e.target.value)}
                        className="auth-form-input w-[250px]" />
                        <div className='text-sm text-red-800'>
                            {message1?message1:""}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Confirm password</label>
                        <input type="password" name="password2" id="password2" 
                        placeholder="Confirm your password"
                        value={password2}
                        onChange={(e)=>setPassword2(e.target.value)}
                        className="auth-form-input w-[250px]" />
                        <div className='text-sm text-red-800'>
                            {message2?message2:""}
                        </div>
                    </div>

                    <button type="submit"
                    className="text-white mt-4 bg-second-green font-bold py-3 text-lg rounded-lg cursor-pointer"
                    >
                    Submit
                    </button>
                </form>        
        </div>
    </div>
  )
}

export default PasswordInput