"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"


 
const signup = () => {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        router.push("/admin-signup/step2")
    }

  return (
    <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center text-center pt-20 pb-15 px-8">
            <h2  className="font-semibold text-grey-400 text-3xl">
                Welcome, create your company account
            </h2>
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-16 px-16">
            <h3 className="text-center font-bold text-lg text-grey-500 pb-13">
                It is our pleasure to have you on board!
            </h3>
            <form action="" id="signup-form"
               className="flex flex-col gap-5"
               onSubmit={handleSubmit}>
                <input type="text" name="companyName" id="companyName" 
                placeholder="Enter your company name"
                className="auth-form-input w-full" />

                <input type="email" name="adminEmail" id="adimnEmail" 
                placeholder="Enter the comapny email"
                className="auth-form-input w-full" />

                <input type="text" name="amidnName" id="adminName" 
                placeholder="Enter the name of admin"
                className="auth-form-input w-full" />

                <button type="submit"
                className="text-white mt-4 bg-second-green font-bold py-3 text-lg rounded-lg cursor-pointer"
                >
                Next
                </button>
                <div>
                    <Link href="/user-signup"
                    className="flex justify-center pt-3 text-grey-500">
                        Not Admin? 
                        <span
                        className="text-[#2D88D4] font-bold pl-1">Employee sign up</span>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default signup