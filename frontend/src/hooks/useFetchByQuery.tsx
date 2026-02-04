import { useEffect, useState } from "react"

type FetchResult<T>={
  data:T|null,
  isLoading:boolean,
  errorMessage:string|null
}

export default function useFetchByQuery<T>(route:string,query:string):FetchResult<T>{
    const [data, setData]= useState<T|null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

    const fetchData = async()=>{
      const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/${route}`
        setIsLoading(true)
        setErrorMessage('')

        try{
            const res = await fetch(`${ENDPOINT}/search?${query}`,{
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
    console.log(query)  
    fetchData()
  },[query, route])

    return {data, isLoading, errorMessage}
}