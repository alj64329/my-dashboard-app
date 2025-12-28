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

  return (
    <div>
        <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params">
      {({ open: openUpload }) => (
          <Sheet open={open} onOpenChange={setProfileOpen}>
            <SheetContent>
              <div className="relative py-12 flex justify-center">
                <button
                  type="button"
                  className="absolute bg-white p-3 rounded-[50%] right-15 top-[10%] border cursor-pointer"
                  onClick={() => openUpload()}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <CldImage
                  width={210}
                  height={210}
                  src={userPic?userPic:defaultUser.profilePic}
                  alt="Profile"
                  className="rounded-2xl"
                />
              </div>
            </SheetContent>
          </Sheet>
      )}
    </CldUploadWidget>
    </div>
  )
}

export default ProfileSheet