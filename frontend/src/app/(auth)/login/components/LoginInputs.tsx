'use client'
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useState } from "react"

type Props = {}

const LoginInputs = (props: Props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShow, setPasswordShow]= useState(false)
    const [error,setError] = useState<string>("")


    const loginHandler =async()=>{

    }
  return (
            <div className="bg-grey-25 min-h-screen">
        <div className="flex justify-center pt-20 pb-15 px-8">
            <h2  className="font-semibold text-grey-400 text-center text-3xl">
                Login
            </h2>
        </div>
        <div className="flex justify-center flex-col w-fit mx-auto bg-white py-12 px-16">

            
                <form action="login-form" 
                className="flex flex-col gap-5"
                onSubmit={loginHandler}>
                    <input type="email" name="login-email" id="login-email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="auth-form-input w-full" />

                    <div className='flex items-center auth-form-input'>
                        <input type={passwordShow?"text":"password"} 
                        name="login-password" id="login-password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-[90%] focus:outline-none focus:ring-0" />
                        <span
                        className='text-[22px] text-grey-200'>
                            {
                                passwordShow?
                                <RiEyeCloseLine
                                onClick={()=>setPasswordShow(false)}/>:
                                <RiEyeLine
                                onClick={()=>setPasswordShow(true)}/>
                            }
                        </span>
                    </div>


                    {error&&
                    <div className='text-red-800 text-sm'>
                        {error}
                    </div>}
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

export default LoginInputs