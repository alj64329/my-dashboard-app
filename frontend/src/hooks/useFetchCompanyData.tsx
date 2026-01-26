import { useEffect, useState } from "react"

export default function useFetchCompanyData(route:string,companyId:string){
  const [data, setData]= useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

    const fetchData = async()=>{
      const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_ENDOPOINT}/${route}`
        setIsLoading(true)
        setErrorMessage('')

        try{
            const res = await fetch(`${ENDPOINT}/search?companyId=${companyId}`)

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
    console.log(companyId)  
    fetchData()
  },[companyId])

    return {data, isLoading, errorMessage}
}