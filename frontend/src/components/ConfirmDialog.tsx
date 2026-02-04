import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dispatch, SetStateAction } from "react"

type Props = {
    isConfirmOpen:boolean,
    setIsComfirmOpen:Dispatch<SetStateAction<boolean>>,
    setIsComfirm:Dispatch<SetStateAction<boolean>>
}

const ConfirmDialog = ({isConfirmOpen,setIsComfirmOpen,setIsComfirm}: Props) => {
  return (
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsComfirmOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This will permanently delete from our database.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    onClick={()=>setIsComfirm(true)}
                    className="md:ms-12">
                        Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}

export default ConfirmDialog