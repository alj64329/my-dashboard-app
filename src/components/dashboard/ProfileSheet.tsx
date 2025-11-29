'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet"
import { defaultUser } from "@/src/constants/default.constants"
import { UserContext } from "@/src/context/UserContext"
import { ProfileSheetProps } from "@/src/types/dashboard.types"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { useContext, useRef, useState } from "react"


const ProfileSheet = ({open, setProfileOpen}:ProfileSheetProps) => {
    const userInfo = useContext(UserContext)
    const userPic = userInfo?.user?.profilePic
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        console.log(file)

    }
  return (
    <div>
    <Sheet open={open} onOpenChange={setProfileOpen} >
        <SheetContent>
            <SheetHeader>
            </SheetHeader>
            <div className="p-8">
                <div
                className="text-2xl text-center">Profile</div>
                <div className="py-12 flex justify-center relative">
                    <CldUploadWidget uploadPreset="ml_default">
                        {({ open }) => {
                            return (
                            <div 
                            className="absolute bg-white p-3 rounded-[50%] right-5 top-[10%] border cursor-pointer z-20"
                            onClick={()=>open()}>
                                <FontAwesomeIcon icon={faPenToSquare} 
                                className="text-xl"/>
                                {/* <input type="file" id="profile_pic" name="profile_pic" 
                                ref={fileInputRef}
                                accept=".jpg,.jpeg,.png" 
                                className="hidden"
                                onChange={handleFileChange}/> */}
                            </div>
                            );
                        }}
                    </CldUploadWidget>
                <CldImage
                    width={210}
                    height={210}
                    src={userPic?userPic:defaultUser.profilePic}
                    alt={defaultUser.alt}
                    className="rounded-2xl"/>
                </div>

            </div>
        </SheetContent>
    </Sheet>
    </div>
  )
}

export default ProfileSheet