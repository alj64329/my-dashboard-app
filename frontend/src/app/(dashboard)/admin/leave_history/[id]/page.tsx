
import { getLeaveRequestById } from "@/src/features/request/leaveRequest.features";
import ClientLeaveReq from "./ClientLeaveReq";

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

    const data = await getLeaveRequestById(id)

  return (
    <div>
        <ClientLeaveReq data={data}/>
    </div>
  )
}

export default page