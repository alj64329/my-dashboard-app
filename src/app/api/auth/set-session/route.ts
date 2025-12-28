import { NextResponse } from "next/server"


export async function POST(req:Request){
    try{
        const body = await req.json()
        const role = body.role

        if(!role){
            return NextResponse.json({error:"Role required"},{status:400})
        }

        const res = NextResponse.json({success:true})

        //set cookies
        res.cookies.set("auth","true",{
            path:"/",
            httpOnly:true,
            maxAge:3600
        })

        res.cookies.set("role",role,{
            path:"/",
            httpOnly:true,
            maxAge:3600
        })

        return res
    }catch(err){
        console.log("Error in set-session route", err)
        return NextResponse.json(
            {error:"Something went wrong"},
            {status:500}
        )
    }
}