'use client'
import React, { useContext, useEffect, useState } from 'react'
import { AdminData, EmployeeData, Role, User } from '../types/index.types'
import { useRouter } from 'next/navigation'
import { validatePassword } from '../utils/validatePassword'
import { assignAdmin, login, registerCompany, registerUser, updateAccount } from '../features/auth/auth.features'
import { UserContext } from '../context/UserContext'
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { log } from 'console'

export type AuthFormprops ={
    h2Title:string,
    authFormType:  "signup-step1"|"signup-step2"|"login",
    data?:AdminData| EmployeeData
}

const AuthFormBase = ({h2Title, authFormType , data}:AuthFormprops) => {
    const router = useRouter()
    const userInfo = useContext(UserContext)
    // sign up useState
    const [password1, setPassword1] =useState("")
    const [password2, setPassword2] =useState("")
    const [message1, setMessage1] = useState("")
    const [message2, setMessage2] = useState("")
    const [error, setError] = useState("")
    //login useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShow, setPasswordShow]= useState(false)
    const [password2Show, setPassword2Show]= useState(false)

    //initialize dashboard route
    let dashboardRoute :string
    
    //data parameter is neeed to sign up company
    const handleSignup =async(e:React.FormEvent)=>{
        console.log(data)
        e.preventDefault()
        //password check
        //if one of them is empty
        if(password1!==password2){
            setMessage2("Both password need to match")
            return
        }
        //sign up company
        if(!data ){
            return
        }

        let companyId:string =""
        let newUser:Partial<User>
        let user

        if(data.role==="admin"){    
            dashboardRoute = "/admin"
            
            //create company account with only company name
            const company= await registerCompany(data.company_name)
            
            if(!company) return

            companyId = company._id

            newUser={
                name:data.name,
                role:data.role,
                email:data.email,
                password:password1,
                companyId,
            }
            //create admin user
            user = await registerUser(newUser)
            
            if(!user){
                console.error("Error creating users")
                return
            }

            //update company with admin userId
            const adminId = user._id

            const updatedCompany = await assignAdmin(companyId,adminId)

            if(!updatedCompany){
                console.log("Error occur while updating")
                return
            }
            // userInfo?.setCompany(updatedCompany)

        }else if(data.role==="employee"){   
            dashboardRoute ="/employee" 

            newUser={
                name:data.name,
                email:data.email,
                companyId: data.companyId,
                role: data.role,
                password: password1
            }

           //register user
           user = await registerUser(newUser)

        }

        //login
        const loggedInUser = await login(data.email,password1)
        console.log(loggedInUser)

        if(!loggedInUser){
            console.log("Error occur when loggin in")
        }

        userInfo?.handleSetLoggedInUser(loggedInUser)

        //toaster
        toast.success('Successfully logged in. You are directing to Dashboard page', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })

        //claer sessionStorage
        sessionStorage.clear()

        //direct to dashboard
        router.replace(dashboardRoute)
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

    //login
    const loginHandler= async(e:React.FormEvent)=>{
        e.preventDefault()

        const user = await login(email, password)

        if(!user){
            setError("Please check the email and password")
            return
        }

        //set logged in user with company detail
        userInfo?.handleSetLoggedInUser(user)

        //toaster
        toast.success('Successfully logged in. You are directing to Dashboard page', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            })
        //User logged in direct to dashboard
        router.push(dashboardRoute)
    }

    const handleChange = (e:MouseEvent)=>{

    }


  return (
    <div className="bg-grey-25 min-h-screen">
        <ToastContainer/>
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
                        <div className='flex items-center auth-form-input w-[250px]'>
                            <input  type={passwordShow?"text":"password"}
                            name="password1" id="password1" 
                            placeholder="Enter your password"
                            value={password1}
                            onChange={(e)=>setPassword1(e.target.value)}
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
                        <div className='text-sm text-red-800'>
                            {message1?message1:""}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">Confirm password</label>
                         <div className='flex items-center auth-form-input w-[250px]'>
                            <input type={password2Show?"text":"password"}
                            name="password2" id="password2" 
                            placeholder="Confirm your password"
                            value={password2}
                            onChange={(e)=>setPassword2(e.target.value)}
                            className="w-[90%] focus:outline-none focus:ring-0" />
                                <span
                                className='text-[22px] text-grey-200'>
                                    {
                                        password2Show?
                                        <RiEyeCloseLine
                                        onClick={()=>setPassword2Show(false)}/>:
                                        <RiEyeLine
                                        onClick={()=>setPassword2Show(true)}/>
                                    }
                                </span>
                        </div>
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
                </form>}
            
        </div>
    </div>
  )
}

export default AuthFormBase