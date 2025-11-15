'use client'
import OTPForm from '@/src/components/OTPForm'
import React from 'react'

const page = () => {

  return (
      <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-16 px-16">
            <h3 className="text-center font-bold text-[24px] text-grey-500 pb-13 pt-10">
                Please enter OTP
            </h3>
            <OTPForm/>
        </div>
    </div>
  )
}

export default page