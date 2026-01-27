import { useEffect, useState } from "react"

type FetchResult<T>={
  data:T|null,
  isLoading:boolean,
  errorMessage:string|null
}

export default function useFetchById<T>(route:string,id:string):FetchResult<T>{
    const [data, setData]= useState<T|null>(null)
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