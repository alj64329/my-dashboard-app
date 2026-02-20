import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Props = {
    isOpen:boolean,
    setIsClose:()=>void
    title?:string,
    ContentComponent?:React.ComponentType
}

const Modal = ({isOpen, setIsClose,ContentComponent }: Props) => {

    if(!isOpen){
        return null
    }

  return (
    <div>
      <Dialog
      open={isOpen} onOpenChange={setIsClose}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle />
            <DialogDescription/>
            </DialogHeader>
            {ContentComponent&&<ContentComponent/>}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal