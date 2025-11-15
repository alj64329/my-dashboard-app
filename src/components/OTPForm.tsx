'use client'
import React, { FormEvent, useRef, useState } from 'react'

const OTPForm = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [isHovered, setIsHovered] = useState(false)

    const handleInput =(e:React.ChangeEvent<HTMLInputElement>, index:number)=>{
        const value = e.target.value
        console.log(inputRefs)

        if(!/^[0-9]$/.test(value)){
            e.target.value=""
            return
        }
        //move to next input automatically
        if(value && index <5){
            inputRefs.current[index+1]?.focus()
        }

        const otp = inputRefs.current.map((input)=>input?.value||"").join("")

        //submit after 6 digits are filled
        if(otp.length === 6){
            inputRefs.current[index]?.blur()
            setIsHovered(true)
            optHandler(otp)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index:number)=>{
        if(e.key === "Backspace"){
            inputRefs.current[index]!.value=""

            //move to previous input if current is empty
            if(index>0){
                inputRefs.current[index-1]?.focus()
            }
        }
    }
    
    const optHandler = async(otp:string)=>{
        console.log(otp)
    }
  return (
    <form id="otp-form"
    className='mt-15'
    >
        <div className="flex items-center justify-center gap-3">
            {Array.from({length:6}).map((_,i)=>(
                <input
                    type="text"
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    inputMode='numeric'
                    ref={(el)=>{inputRefs.current[i]= el}}
                    onChange={(e)=> handleInput(e, i)}
                    onKeyDown={(e)=>handleKeyDown(e, i)}
                    key={i}  />
            ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-18">
            <button type="submit"
                className={`w-full font-bold inline-flex justify-center whitespace-nowrap rounded-lg bg-second-green px-3.5 py-2.5 text-sm text-white shadow-sm shadow-teal-950/10 cursor-pointer hover:grayscale-50${isHovered&&"grayscale-50"}`}>
                    Continue</button>
        </div>
    </form>
  )
}

export default OTPForm