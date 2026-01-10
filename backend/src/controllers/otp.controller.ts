import dotenv from 'dotenv'
dotenv.config() // MUST be first, top of file

import { Request, Response } from "express"
import crypto from 'crypto'
import bcrypt from 'bcrypt';
import { transporter } from "../config/nodemail.config";
import { redis } from "../server";

interface SendOTPBody{
    email:string
}
const sendOTP =async(req:Request<{},{},SendOTPBody>, res:Response)=>{
    const {email} =req.body

    if(!email){
        return res.status(400).json({message:"Email required"})
    }

    try{
        const otp = crypto.randomInt(0, 1000000).toString().padStart(6, '0');
        const hash = await bcrypt.hash(otp,10)

        //store otp in redis for 5 mins
        await redis.set(`otp:${email}`,hash,{ex:300})
        console.log('EMAIL_USER:', process.env.EMAIL_USER)
        console.log('GOOGLE_APP_PASS:', process.env.GOOGLE_APP_PASS ? 'LOADED' : 'MISSING')

        // Test the transporter
        transporter.verify((error, success) => {
        if (error) {
            console.error('Email transporter error:', error)
        } else {
            console.log('Email transporter is ready to send messages!')
        }
        })
        //send otp via email
        const result = await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Your OTP',
            text:`Your OTP is ${otp}. It will expire in 5 minutes`
        })
        console.log(result)

        res.status(200).json({message:"OTP sent"})

    }catch(error){
        res.status(500).json({message:'Error sending OTP'})
    }
}

interface VerifyOTPBody{
    email:string,
    otp:string
}

const verifyOTP = async(req:Request<{},{},VerifyOTPBody>,res:Response)=>{
    const {email, otp} = req.body

    if(!email || !otp){
        return res.status(400).json({message:"Missing fields"})
    }

    try{
        const storedHash = await redis.get(`otp:${email}`)
        if(!storedHash) return res.status(400).json({message:"Invalid or expired OTP"})

        const valid = await bcrypt.compare(otp,storedHash as string)
        if(!valid) return res.status(400).json({message:"Invalid OTP"})

        await redis.del(`otp:${email}`)
        return res.status(200).json({message:"OTP verfied successfully"})
    }catch(error){
        return res.status(500).json({message:"Error in verifying otp"})
    }
}

export default{
    sendOTP,
    verifyOTP
}