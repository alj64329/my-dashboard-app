import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{
        const res = NextResponse.json({success:true})

        res.cookies.set("auth", "",{path:"/", maxAge:0})
        res.cookies.set("role", "",{path:"/", maxAge:0})

        return res
    }catch(err){
        console.log("Eroor in logout route", err)
        return NextResponse.json({error:"Something went wrong"},{status:500})
    }
}