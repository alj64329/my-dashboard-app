import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){
    const cookies = req.cookies
    console.log(cookies)
    // const auth = req.cookies.get('auth')?.value
    // const role = req.cookies.get('role')?.value
    // const path = req.nextUrl.pathname


    // if(!auth && (path.startsWith('/admin')||path.startsWith('/employee'))){
    //     return NextResponse.redirect(new URL('/', req.url))
    // }

    // if(role ==='employee' && path.startsWith('/admin')){
    //     return NextResponse.redirect(new URL('/employee', req.url))
    // }
    // if(role ==='admin' && path.startsWith('/employee')){
    //     return NextResponse.redirect(new URL('/admin', req.url))
    // }

    // return NextResponse.next()
}

export const config={
    matcher:["/admin/:path*","/employee/:path*"]
}