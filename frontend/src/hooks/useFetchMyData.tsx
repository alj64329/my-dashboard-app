import { useEffect, useState } from "react"

export default function useFetchMyData(route:string,userId:string){
  const [data, setData]= useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

    const fetchData = async()=>{
      const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/${route}`
        setIsLoading(true)
        setErrorMessage('')

        try{
            const res = await fetch(`${ENDPOINT}/search?userId=${userId}`)

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
    console.log(userId)  
    fetchData()
  },[userId])

    return {data, isLoading, errorMessage}
}