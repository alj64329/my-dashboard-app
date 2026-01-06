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
import { APTUser } from "@/src/types/appwriteDb.types"
import { CldImage } from "next-cloudinary"
import { useContext, useEffect, useState } from "react"
import { Bounce, ToastContainer, toast } from 'react-toastify';

type Props = {}

const page = (props: Props) => {
  const userInfo = useContext(UserContext)
  const comapnyId = userInfo?.user?.companyId
  const [employees, setEmployees]= useState<APTUser[]>([])
  const [update, setUpdate] = useState<APTUser|null>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const onClose = ()=>{
    setIsModalOpen(false)
  }

  const getEmployees = async()=>{
    if(!comapnyId){
      console.log("compnay Id not exist")
      return
    }
    const rowList = await listUsersByCompany(comapnyId)

    if(!rowList){
      setEmployees([])
      return
    }

    const mappedEmployees:APTUser[]= rowList.rows.map((row)=>({
      rowId:row.$id,
      name:row.name,
      email:row.email,
      role:row.role,
      position:row.position,
      companyId:row.companyId,
      appwriteId:row.appwriteId,
      profilePic:row.profilePic
    }))

    setEmployees(mappedEmployees)
  }

  //modify employee function
  const updateEmployee = async(updatedEmp:APTUser)=>{

    const updates = await modifyUsers(updatedEmp)

    if(!updates){
      //toaster
      toast('Something went wrong, please try again',{
        position: "top-right",
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
      position: "top-right",
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

  const rowClickHandler = (emp:APTUser)=>{
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
            <TableRow key={emp.rowId}
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
      <ToastContainer />
      <Modal isOpen={isModalOpen} setIsClose={onClose} employee={update} onUpdate={updateEmployee}/>
    </div>
  )
}

export default page