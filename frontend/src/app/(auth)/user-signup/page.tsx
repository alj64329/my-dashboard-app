"use client"

import { UserContext } from '@/src/context/UserContext'
import { findCompany } from '@/src/features/auth/auth.features'
import { Role } from '@/src/types/index.types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const page = () => {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const userInfo = useContext(UserContext)

  const handleNext = async (e: React.FormEvent)=>{
      e.preventDefault()

      //Find a company from company code
      const company = await findCompany(code) 

      if(!company){
        setError("Company code is invalid!")
        return
      }

    const companyId = company._id

    //   //send OTP code to see if email exist
    //   const temp = await sendOTP(email)

    //   if(!temp) return

    //store company name and email in sessionStorage
    sessionStorage.setItem(
        "registrationData",
        JSON.stringify({companyId, email, name, role:Role.employee})
    )

    //   router.push("/user-signup/step2")
    router.push("/user-signup/step3")
  }
  return (
      <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center pt-20 pb-15 px-8">
            <h2  className="font-semibold text-grey-400 text-center text-3xl">
                Welcome, create your account
            </h2>
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-20 px-16">
            <h3 className="text-center font-bold text-lg text-grey-500 pb-13">
                It is our pleasure to have you on board!
            </h3>
            <form action="" id="signup-form"
               className="flex flex-col gap-5"
               onSubmit={handleNext}>
                <input type="text" name="name" id="name" 
                placeholder="Enter your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="auth-form-input w-full" />

                <input type="email" name="email" id="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="auth-form-input w-full" />

                <input type="text" name="companyCode" id="companyCode" 
                placeholder="Enter the company code"
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                className="auth-form-input w-full" />

                {error&&
                <div className='text-sm text-red-800'>{error}</div>}

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
        </div>
    </div>

  )
}

export default page