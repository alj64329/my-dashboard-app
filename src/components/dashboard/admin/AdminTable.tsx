import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

type Props = {
    type:"leave" |"expense",
    onModaHandler:()=>void,
    dataSetter:(data:PendingTableExpense|PendingTableLeave)=> void
}

export interface PendingTableLeave{
    id:string,
    employeeName:string,
    from:string,
    to:string,
}

export interface PendingTableExpense{
    id:string,
    employeeName:string,
    expenseType:string,
    amount:number
}


//dummy data
const pendingLeave:PendingTableLeave[] =[
    {
    id:"1",
    employeeName:"John",
    from: "2024-12-31",
    to:"2024-01-31"
},
    {
    id:"2",
    employeeName:"Amy",
    from: "2024-12-31",
    to:"2024-01-31"
},
]
const pendingExpense:PendingTableExpense[] =[
    {
    id:"1",
    employeeName:"John",
    expenseType: "entertainment",
    amount:20.99
},
    {
    id:"2",
    employeeName:"Amy",
    expenseType: "travel",
    amount:100
},
]

const AdminTable = ({onModaHandler,dataSetter,type}: Props) => {
    const [expenseData, setExpenseData] = useState<PendingTableExpense[]>([])
    const [leaveData, setLeaveData] = useState<PendingTableLeave[]>([])

    const clickHandler =(data:PendingTableExpense|PendingTableLeave)=>{
        console.log(data)
        onModaHandler()
        dataSetter(data)
    }
    useEffect(()=>{
        //fetch the data -> data need to be join with user, so it includes username

        if(type==="expense"){
            setExpenseData(pendingExpense)
        }else{
            setLeaveData(pendingLeave)
        }
    },[type])

    if(type==="expense"){
        return(
        <div>
        <div>Pending Expense Requests</div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">
            Employee Name
          </TableHead>
          <TableHead  className="font-bold">
            Expense Type
          </TableHead>
          <TableHead  className="font-bold">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {expenseData.map((data, i) => (
          <TableRow key={i} className="font-medium cursor-pointer"
          onClick={()=>clickHandler(data)}>
            <TableCell>{data.employeeName}</TableCell>
            <TableCell>{data.expenseType}</TableCell>
            <TableCell>$ {data.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
        )
    }else if(type==="leave"){
                return(
        <div>
        <div>Pending Leave Requests</div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">
            Employee Name
          </TableHead>
          <TableHead  className="font-bold">
            From 
          </TableHead>
          <TableHead  className="font-bold">
            To
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {leaveData.map((data, i) => (
          <TableRow key={i}
          className="cursor-pointer font-medium"
          onClick={()=>clickHandler(data)}>
            <TableCell>{data.employeeName}</TableCell>
            <TableCell>{data.from}</TableCell>
            <TableCell>$ {data.to}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
        )
    }
  return (
    <div>
        Something went wrong
    </div>
  )
}

export default AdminTable