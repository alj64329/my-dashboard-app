import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PendingTableExpense, PendingTableLeave } from "./dashboard/admin/AdminTable"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { RequestType } from "../types/dashboard.types"
import { User } from "../types/index.types"

type Props = {
  isOpen:boolean,
  setIsClose:()=>void
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
  dataset?:{
      type:"expense",
      data:PendingTableExpense
    }|{
      type:"leave",
      data:PendingTableLeave
    }| null,
  employee?:User |null,
  onUpdate?:(updatedEmp:User)=> void,

  FormComponent?:React.ComponentType<{formType:RequestType}>,
  formType?:RequestType
}

const Modal = ({isOpen, setIsClose, title, ContentComponent, dataset, FormComponent, formType}: Props) => {

  return (
    <div>
      <Dialog
      open={isOpen} onOpenChange={setIsClose}>
        <DialogContent>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle></DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
            {(ContentComponent&& dataset)&&<ContentComponent dataset={dataset}/>}
            {(FormComponent && formType )&&<FormComponent formType={formType}/>}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal