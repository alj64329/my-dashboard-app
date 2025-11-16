'use client'
import React, { useEffect, useState } from 'react'
import { AuthFormprops, Role, User } from '../types/index.types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { validatePassword } from '../utils/validatePassword'
import { registerCompany, registerUser, updateAccount } from '../features/auth/auth.features'


const AuthFormBase = ({h2Title, authFormType , data}:AuthFormprops) => {
    const router = useRouter()
    const [password1, setPassword1] =useState("")
    const [password2, setPassword2] =useState("")
    const [message1, setMessage1] = useState("")
    const [message2, setMessage2] = useState("")
    const [error, setError] = useState("")

    //data parameter is neeed to sign up company
    const handleSignup =async(e:React.FormEvent)=>{
        e.preventDefault()
        //password check
        //if one of them is empty
        if(password1!==password2){
            setMessage2("Both password need to match")
            return
        }
        console.log(data)
        //sign up company
        if(!data ){
            return
        }
        if(data.role==="admin"){    
            //create company account
           const company= await registerCompany(data.company, data.email, data.appwriteId)
           if(!company) return

           const companyId = company.$id

           //account create in Auth
           const isAccountUpdated = await updateAccount(password1)
           if(!isAccountUpdated) {
            setError("Somethig went wrong")
            return
           }

           //create user in user table
           const newUser :Omit<User, 'userId'> ={
            name: data.name,
            email:data.email,
            companyId,
            role: Role.admin,
            appwriteId: data.appwriteId
           }

           const response = await registerUser(newUser)
           console.log(response)

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
            <h2  className="font-semibold text-grey-400 text-center text-3xl">
                {h2Title}
            </h2>
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-12 px-16">

        {/* Passwprd */}
            {authFormType==="signup-step2"&&
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
            }

            {authFormType==="login"&&
                <form action="login-form" 
                className="flex flex-col gap-5">
                    <input type="email" name="login-email" id="login-email" 
                    placeholder="Enter your email"
                    className="auth-form-input w-full" />
                    <input type="password" name="login-password" id="login-password" 
                    placeholder="Enter your password"
                    className="auth-form-input w-full" />

                    <button type="submit"
                    className="text-white mt-4 bg-second-green font-bold py-3 text-lg rounded-lg cursor-pointer"
                    >
                    Submit
                    </button>
                </form>}
            
        </div>
    </div>
  )
}

export default AuthFormBase