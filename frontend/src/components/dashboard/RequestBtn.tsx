import { RequestBtnType } from "@/src/types/dashboard.types"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Modal from "../Modal"
import RequestForm from "../request/RequestForm"

const RequestBtn = ({requestType}:RequestBtnType) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const setIsClose =()=>{
    setIsModalOpen(false)
  }

  const modalShow =()=>{
    setIsModalOpen(true)
    console.log("modal open")
  }
  return (
    <>
    <div className="rounded-2xl bg-[rgba(176,224,230,0.5)] p-5"
    onClick={modalShow}>
        <div className="flex justify-center items-center gap-[0.8rem] cursor-pointer">
            <FontAwesomeIcon icon ={faPlus} />
            <div>{requestType[0].toUpperCase() + requestType.slice(1)} Request</div>
        </div>
    </div>
    {isModalOpen&&
    <Modal isOpen={isModalOpen} 
    setIsClose={setIsClose}
    FormComponent={RequestForm}
    formType={requestType}/>}
    </>
  )
}

export default RequestBtn