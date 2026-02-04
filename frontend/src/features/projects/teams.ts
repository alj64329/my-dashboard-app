const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/teams`

export const getProjectTeamByProjectId =async(projectId:string)=>{
    try{
        const res = await fetch(`${ENDPOINT}/search?projectId=${projectId}`,{
            method:"GET",
        })

        const data = await res.json()
        return data

    }catch(err){
        console.log(`Error fetching: ${err}`)
        return null
    }
}
