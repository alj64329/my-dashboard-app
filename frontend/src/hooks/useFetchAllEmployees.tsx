import { useEffect, useState } from "react"
import { User } from "../types/index.types"
import { listUsersByCompany } from "../features/employee.features"

export default function useFetchAllEmployees(companyId:string){
  const [employees, setEmployees]= useState<Omit<User,'password'>[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage]= useState('')

    const fetchEmployees = async()=>{
        setIsLoading(true)
        setErrorMessage('')

        try{
            const employees = await listUsersByCompany(companyId)

            setEmployees(employees)
        }catch(err){
            console.log(`Error fetching movies: ${err}`)
            setErrorMessage(`Error fetching movies. Please try again later`)
        }finally{
        setIsLoading(false)
        }
    }
  
  useEffect(()=>{
    console.log(companyId)  
    fetchEmployees()
  },[companyId])

    return employees
}