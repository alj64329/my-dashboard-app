
import { ApprovalStatus } from "@/src/types/service.types";
import {  User } from "@/src/types/index.types";
import ClientExpenseReq from "./ClientExpenseReq";
import { getExpenseRequestById } from "@/src/features/request/expenseRequest.features";

export type ERReturnType={
  _id:string,
  title:string,
  amount:number,
  category:string,
  desc:string,
  receipt:string,
  approvalStatus:ApprovalStatus,
  userId:User
}

interface PageProps{
    params:{id:string}
}

const page = async({params}:PageProps) => {
    const {id} = await params

    if(!id){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div>Missing expense ID</div>
            </div>
        )
    }
    const data = await getExpenseRequestById(id)

    if(!data){
        return (
            <div
            className="w-full h-full flex justify-center items-center">
                <div>
                    Page Not Found
                </div>
            </div>
        )
    }

  return (
    <div>
        <ClientExpenseReq data={data}/>
    </div>
  )
}

export default page