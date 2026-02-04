
import { fetchUserById } from "@/src/features/employee.features"
import ClientEmployee from "./ClientEmployee";

interface PageProps{
    params:{id:string}
}

const page = async({params}:PageProps) => {
    const {id} = await params

    if(!id){
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div>Missing employee ID</div>
            </div>
        )
    }
    const data = await fetchUserById(id)


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
        <ClientEmployee data={data}/>
    </div>
  )
}

export default page




