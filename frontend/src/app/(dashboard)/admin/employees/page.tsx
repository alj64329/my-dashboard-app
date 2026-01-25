"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Modal from "@/src/components/Modal"
import { defaultUser } from "@/src/constants/default.constants"
import { UserContext } from "@/src/context/UserContext"
import { listUsersByCompany, modifyUsers } from "@/src/features/employee.features"
import { User } from "@/src/types/index.types"
import { CldImage } from "next-cloudinary"
import { useContext, useEffect, useState } from "react"
import { Bounce, toast } from 'react-toastify';


const page = () => {
  const userInfo = useContext(UserContext)
  const comapnyId = userInfo?.loggedInUser?.companyId._Id
  const [employees, setEmployees]= useState<Omit<User,'password'>[]>([])
  const [update, setUpdate] = useState<Omit<User,'password'>|null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onClose = ()=>{
    setIsModalOpen(false)
  }

  const getEmployees = async()=>{
    if(!comapnyId){
      console.log("compnay Id not exist")
      return
    }

    const employees = await listUsersByCompany(comapnyId)

    if(!employees){
      setEmployees([])
      return
    }

    setEmployees(employees)
  }

  //modify employee function
  const updateEmployee = async(userId:string,data:Partial<User>)=>{

    const updates = await modifyUsers(userId,data)

    if(!updates){
      //toaster
      toast('Something went wrong, please try again',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
      console.log("something went wrong")
      return
    }
    //toaster
    toast('User has been updated',{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })

    console.log("User has been updated")
  }

  const rowClickHandler = (emp:Omit<User,'password'>)=>{
    console.log(emp)
    setIsModalOpen(true)
  }

  useEffect(()=>{
    getEmployees()
  },[comapnyId,update])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Positon</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length>0 ? employees.map((emp)=>(
            <TableRow key={emp._id}
            onClick={()=>rowClickHandler(emp)}>
              <TableCell>
                <span className="flex gap-4">
                  <CldImage
                  width={50}
                  height={50}
                  src={emp.profilePic?emp.profilePic:defaultUser.profilePic}
                  alt="Profile"
                  className="rounded-2xl"
                />
                {emp.name}
                </span>
                </TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.role}</TableCell>
              <TableCell>{emp.position}</TableCell>
            </TableRow>)):
            <TableRow>
              <div>No Employee to show</div>
            </TableRow>
          }
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} setIsClose={onClose} employee={update} onUpdate={updateEmployee}/>
    </div>
  )
}

export default page