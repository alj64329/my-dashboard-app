import { getProjectTeamByProjectId } from "@/src/features/projects/teams";
import ClientProject from "./ClientProject";

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
    const data = await getProjectTeamByProjectId(id)

  return (
    
    <div>
        <ClientProject data={data} projectId={id}/>
    </div>
  )
}

export default page