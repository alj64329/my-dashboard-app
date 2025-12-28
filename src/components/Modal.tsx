import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PendingTableExpense, PendingTableLeave } from "./dashboard/admin/AdminTable"

type Props = {
  isOpen:boolean,
  setIsOpen:()=>void
  title?:string,
  ContentComponent?:React.ComponentType<
  {dataset:
    {
      type:"expense",
      data:PendingTableExpense
    }|{
      type:"leave",
      data:PendingTableLeave
    }}>
  dataset?:    {
      type:"expense",
      data:PendingTableExpense
    }|{
      type:"leave",
      data:PendingTableLeave
    }| null
}

const Modal = ({isOpen, setIsOpen, title, ContentComponent, dataset}: Props) => {
  if(!dataset) return null
  return (
    <div>
      <Dialog
      open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
            {(ContentComponent&& dataset)&&<ContentComponent dataset={dataset}/>}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal