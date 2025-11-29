import { v2 as cloudinary } from 'cloudinary';
// const cloudinary = require('cloudinary').v2;
 

export const post = async (req:Request)=>{
    const body = (await req.json()) as {paramsToSign:Record<string,string>}

    const signature = cloudinary.utils.api_sign_request(body.paramsToSign, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string);

    return Response.json({signature})
}
