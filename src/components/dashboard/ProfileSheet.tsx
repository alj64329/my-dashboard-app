'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { defaultUser } from "@/src/constants/default.constants"
import { UserContext } from "@/src/context/UserContext"
import { ProfileSheetProps } from "@/src/types/dashboard.types"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CldImage } from "next-cloudinary"
import { useContext, useState } from "react"

const ProfileSheet = ({open, setProfileOpen}:ProfileSheetProps) => {
    const userInfo = useContext(UserContext)
    const userPic = userInfo?.user?.profilePic
  return (
    <div>
    <Sheet open={open} onOpenChange={setProfileOpen} >
        <SheetContent>
            <SheetHeader>
            </SheetHeader>
            <div className="p-8">
                <div
                className="text-3xl text-center">Profile</div>
                <div className="py-12 flex justify-center relative">
                    <div className="absolute bg-white p-3 rounded-[50%] right-0 top-[10%] border cursor-pointer">
                        <FontAwesomeIcon icon={faPenToSquare} 
                        className="text-2xl"/>
                        <input type="file" id="profile_pic" name="profile_pic" accept=".jpg,.jpeg,.png" 
                        className="hidden"/>
                    </div>
                <CldImage
                    width={250}
                    height={250}
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