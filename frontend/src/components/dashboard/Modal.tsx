import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "@/src/types/index.types"

type Props = {
    isOpen:boolean,
    setIsClose:()=>void
    title?:string,
//     ContentComponent?:React.ComponentType<
//     {dataset:
//       {
//         type:"expense",
//         data:PendingTableExpense
//       }|{
//         type:"leave",
//         data:PendingTableLeave
//       }}>

//   dataset?:{
//       type:"expense",
//       data:PendingTableExpense
//     }|{
//       type:"leave",
//       data:PendingTableLeave
//     }| null,

    employee?:User |null,
    onUpdate?:(userId:string,data:Partial<User>)=> void,

//   FormComponent?:React.ComponentType<{formType:RequestType}>,
//   formType?:RequestType

}

const Modal = ({isOpen, setIsClose, employee}: Props) => {

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

            {/* {(ContentComponent&& dataset)&&<ContentComponent dataset={dataset}/>}
            {(FormComponent && formType )&&<FormComponent formType={formType}/>} */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal