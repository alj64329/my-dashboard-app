'use client'
import React, { useContext, useEffect, useState } from 'react'
import { AuthFormprops, Role, User } from '../types/index.types'
import { useRouter } from 'next/navigation'
import { validatePassword } from '../utils/validatePassword'
import { login, registerCompany, registerUser, updateAccount } from '../features/auth/auth.features'
import { getCompany, getUser } from '../utils/dashboad'
import { CompanyRow, UserRow } from '../types/usercontent.types'
import { UserContext } from '../context/UserContext'


const AuthFormBase = ({h2Title, authFormType , data}:AuthFormprops) => {
    const router = useRouter()
    const userInfo = useContext(UserContext)
    const [password1, setPassword1] =useState("")
    const [password2, setPassword2] =useState("")
    const [message1, setMessage1] = useState("")
    const [message2, setMessage2] = useState("")
    const [error, setError] = useState("")
    //login useState
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //initialize dashboard route
    let dashboardRoute :string
    

    //data parameter is neeed to sign up company
    const handleSignup =async(e:React.FormEvent)=>{
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
        let companyId =""
        if(data.role==="admin"){    
            dashboardRoute = "/admin"
            //create company account
           const company= await registerCompany(data.company, data.email, data.appwriteId) as CompanyRow
           if(!company) return

           userInfo?.setCompany(company)
           companyId = company.$id
        }
        if(data.role==="employee"){   
            dashboardRoute ="/employee" 
           companyId = data.companyId
        }
        //account create in Auth
        const isAccountUpdated = await updateAccount(password1)
        if(!isAccountUpdated) {
        setError("Somethig went wrong")
        return
        }
        
        if(!companyId) return

        //create user in user table
        const newUser :Omit<User, 'userId'> ={
        name: data.name,
        email:data.email,
        companyId,
        role: data.role==="admin"?Role.admin:Role.employee,
        appwriteId: data.appwriteId
        }

        const response = await registerUser(newUser) as UserRow
        userInfo?.setUser(response)
        //direct to dashboard
        router.push(dashboardRoute)
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

    const loginHandler= async(e:React.FormEvent)=>{
        e.preventDefault()

        const user = await login(email, password)

        if(!user){
            setError("Please check the email and password")
            return
        }

        //update loggedin User, user and company
        userInfo?.setLoggedInUser(user)
        const userId = user.$id
        const userRow = await getUser(userId) as UserRow[]
        const userRow0 = userRow[0]

        userInfo?.setUser(userRow0)
        const role = userRow0.role
        const companyId = userRow0.companyId

        const company = await getCompany(companyId) as CompanyRow
        userInfo?.setCompany(company)
        dashboardRoute = role === Role.admin?"/admin":"/employee"

        console.log("user successfully login")

        //User logged in direct to dashboard
        router.push(dashboardRoute)
    }


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
                className="flex flex-col gap-5"
                onSubmit={loginHandler}>
                    <input type="email" name="login-email" id="login-email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="auth-form-input w-full" />
                    <input type="password" name="login-password" id="login-password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="auth-form-input w-full" />

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