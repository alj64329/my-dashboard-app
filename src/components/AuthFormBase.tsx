'use client'
import React from 'react'
import { AuthFormprops } from '../types/index.types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const AuthFormBase = ({h2Title, authFormType , data}:AuthFormprops) => {
    const router = useRouter()

    //data parameter is neeed to sign up company

    //
    const handleNext = (e: React.FormEvent)=>{
        e.preventDefault()
        router.push("/user-signup/step2")
    }
  return (
    <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center pt-20 pb-15 px-8">
            <h2  className="font-semibold text-grey-400 text-center text-3xl">
                {h2Title}
            </h2>
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-20 px-16">
        {/* Heading text in white box */}
            {authFormType==="signup-step1"&&
            <h3 className="text-center font-bold text-lg text-grey-500 pb-13">
                It is our pleasure to have you on board!
            </h3>
            }
        {/* signup for employee, step2 form can be shared with admin */}
            {authFormType==="signup-step1"&&
            <form action="" id="signup-form"
               className="flex flex-col gap-5"
               onSubmit={handleNext}>
                <input type="text" name="name" id="name" 
                placeholder="Enter your name"
                className="auth-form-input w-full" />

                <input type="email" name="email" id="email" 
                placeholder="Enter your email"
                className="auth-form-input w-full" />

                <input type="text" name="companyCode" id="companyCode" 
                placeholder="Enter the company code"
                className="auth-form-input w-full" />

                <button type="submit"
                className="text-white mt-4 bg-second-green font-bold py-3 text-lg rounded-lg cursor-pointer"
                >
                Next
                </button>
                <div>
                    <Link href="/admin-signup"
                    className="flex justify-center text-grey-500">
                        Not Employee? 
                        <span
                        className="text-[#2D88D4] font-bold">Admin sign up</span>
                    </Link>
                </div>
            </form>
            }

        {/* Passwprd */}
            {authFormType==="signup-step2"&&
                <form action="" 
                className="flex flex-col gap-5 text-grey-500">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Choose a password</label>
                        <input type="password" name="signup-password" id="signup-password" 
                        placeholder="Enter your password"
                        className="auth-form-input w-[250px]" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Confirm password</label>
                        <input type="password" name="comfirm-password" id="confirm-password" 
                        placeholder="Confirm your password"
                        className="auth-form-input w-[250px]" />
                    </div>

                    <div>

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