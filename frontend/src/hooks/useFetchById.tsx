import { useEffect, useState } from "react"

export default function useFetchCompanyData(route:string,id:string){
    const [data, setData]= useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

    const fetchData = async()=>{
      const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/${route}`
        setIsLoading(true)
        setErrorMessage('')

        try{
            const res = await fetch(`${ENDPOINT}/${id}`,{
                method:"GET",
            })

            const data = await res.json()

            setData(data)
        }catch(err){
            console.log(`Error fetching: ${err}`)
            setErrorMessage(`Error fetching data. Please try again later`)
        }finally{
        setIsLoading(false)
        }
    }
  
  useEffect(()=>{
    console.log(id)  
    fetchData()
  },[id, route])

    return {data, isLoading, errorMessage}
}