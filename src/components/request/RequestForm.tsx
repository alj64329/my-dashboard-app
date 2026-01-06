'use client'
import { CldUploadButton } from 'next-cloudinary';
import { SiReacthookform } from "react-icons/si";
import { UserContext } from '@/src/context/UserContext'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { category, leaveTypes } from '@/src/constants/requestForm.constants';
import { ApprovalStatus, LeaveType } from '@/src/types/service.types';
import { ReceiptIcon } from 'lucide-react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { ExpenseReq, LeaveReq } from '@/src/types/appwriteDb.types';
import { createExpenseRequest } from '@/src/features/request/expenseRequest.features';
import { createLeaveRequest } from '@/src/features/request/leaveRequest.features';

type Props = {
    formType:"expense" |"leave"
}

export interface ExpenseFormData{
    title:string,
    amount:number,
    category:string,
    desc:string,
    receipt:string,
}
export interface LeaveFormData{
    startDate: Date,
    endDate:Date,
    leaveType: LeaveType |""
}

const RequestForm = ({formType}: Props) => {
    const userInfo = useContext(UserContext)

    //deconstruct to get just ids from userInfo
    const userId = userInfo?.user?.$id
    const companyId = userInfo?.user?.companyId
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [expenseFormData, setExpenseFormData] = useState<ExpenseFormData>({
        title:"",
        amount:0,
        category:"",
        desc:"",
        receipt:""
    })
    const [leaveFormData, setLeaveFormData] = useState<LeaveFormData>({
        startDate: new Date(),
        endDate:new Date(),
        leaveType: ""
    })

    const handleChange =(e:ChangeEvent<HTMLInputElement |HTMLTextAreaElement| HTMLSelectElement >)=>{
        const {name, value, type } = e.target
        console.log(type)
        if(formType==="expense"){
            if(type==="file"){
                const files= (e.target as HTMLInputElement).files
                if(!files) return
                setExpenseFormData(prev =>({
                ...prev,
                [name]:files[0].name       
                }))
            }
            setExpenseFormData(prev=>({
                ...prev,
                [name]:value
            }))
        }else if(formType === "leave"){
            setLeaveFormData(prev=>({
                ...prev,
                [name]:value
            }))
        }

    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        //if userId and companyId not exist return 
        if(!userId || !companyId) return

        if(formType ==="expense"){
            const {title, amount, category, receipt, desc} = expenseFormData
            if(!title||amount===0||!category||!receipt){
                console.log(expenseFormData)
                toast.error("Plese fill required field",{
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
                return
            }
            console.log(expenseFormData)
            //POST request to appwrite endpoint
            const request:Omit<ExpenseReq,'rowId'> ={
                userId,
                companyId,
                title,
                amount,
                category,
                desc,
                receipt,
                approvalStatus:ApprovalStatus.pending
            }

            const res = await createExpenseRequest(request)

            if(!res){
                toast.error('Something went wrong, please try again', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return
            }
            toast.success('Your request has been submitted, please contact admin for any modification', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setIsSubmitted(true)
        }else if(formType === "leave"){
            const {startDate, endDate, leaveType} = leaveFormData
            if(!leaveType){
                toast.error("Plese fill required field",{
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
                return
            }

            const request:Omit<LeaveReq,'rowId'> ={
                userId,
                companyId,
                startDate,
                endDate,
                leaveType,
                approvalStatus: ApprovalStatus.pending
            }
            console.log(request)
            const res = await createLeaveRequest(request)

            if(!res){
                toast.error('Something went wrong, please try again', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return
            }
            toast.success('Your request has been submitted, please contact admin for any modification', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setIsSubmitted(true)
        }
    }

    if(formType === "expense"){
        return(
        <div className='flex flex-col gap-12 justify-center py-8'>
            <div
            className='flex gap-3 justify-center items-center'>
                 <SiReacthookform
                 className='text-white bg-gray-400 p-2 rounded-[50%] text-4xl' />                   
                {formType.toUpperCase()} REQUEST FROM 
            </div>

            <form
            onSubmit={handleSubmit}
              className='flex flex-col justify-center gap-6 px-6'>
                <div>
                    <label
                    className='font-bold'
                    >
                        Title<span className='text-red-700'>*</span>:
                    </label>
                    <input 
                    className='w-full font-medium ps-4 focus:outline-0'
                    type="text"
                    name="title" 
                    placeholder='Please enter a short summary of your expense'
                    value={expenseFormData.title}
                    onChange={handleChange}/>
                </div>
                <div className='flex gap-6'>
                    <label
                    className='font-bold'>
                    Amount<span className='text-red-700'>*</span>: </label>
                    <span>$ 
                        <input 
                        className='border-b w-[55px] ps-4 focus:outline-0'
                        type="number"
                        name="amount"
                        step=".01" 
                        value={expenseFormData.amount}
                        onChange={handleChange}/>
                    </span>
                </div>
                <div className='flex gap-5'>
                    <label
                    className='font-bold'>
                        Categoty<span className='text-red-700'>*</span>:</label>
                    <select 
                    name="category" 
                    id="category"
                    value={expenseFormData.category}
                    onChange={handleChange}>
                        <option
                        value=""></option>
                       {category.sort().map((item,index)=>(
                        <option 
                        value={item}
                        key={index}>{item}</option>
                       ))}
                    </select>
                </div>
                <div>
                    <label 
                    className='font-bold'>
                        Description:</label>
                    <textarea 
                    name="desc" 
                    className='w-full h-[50px] border-b'
                    value={expenseFormData.desc}
                    onChange={handleChange}/>
                </div>

                <div className='flex gap-4'>
                    <label
                    className='font-bold'>
                        Receipt<span className='text-red-700'>*</span>:</label>
                    <input
                    name="receipt"
                    type='file'
                    accept='image/*, application/pdf'
                    className='border'
                    onChange={handleChange}
                    />
                </div>

                {!isSubmitted&&<button
                type='submit'>
                    Submit
                </button>}
            </form>
            <ToastContainer/>
        </div>
        )
    }else if(formType === "leave"){

    return (
        <div className='fflex flex-col gap-12 justify-center py-8'>
            <div
            className='flex gap-3 justify-center items-center pb-3'>
                 <SiReacthookform
                 className='text-white bg-gray-400 p-2 rounded-[50%] text-4xl' />                   
                {formType.toUpperCase()} REQUEST FROM 
            </div>

            <form
            onSubmit={handleSubmit}
              className='flex flex-col justify-center gap-6 px-6 py-6'>
                <div className='flex justify-between gap-4'>
                    <div className='flex flex-col flex-1'>
                        <label
                        className='font-bold'
                        >
                            Form Date<span className='text-red-700'>*</span>:
                        </label>
                        <input 
                        className='focus:outline-0 font-medium w-fit'
                        name="startDate"
                        type="date" 
                        value={leaveFormData.startDate.toString()}
                        onChange={handleChange}/>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <label
                        className='font-bold'>
                            To Date<span className='text-red-700'>*</span>:
                        </label>
                        <input 
                        className='focus:outline-0 font-medium w-fit'
                        name = "endDate"
                        type='date' 
                        value={leaveFormData.endDate.toString()}
                        onChange={handleChange}/>
                    </div>
                </div>
                
                {/* Leave Type */}
                <div>
                    <label
                    className='font-bold pe-8'>
                       Leave Type<span className='text-red-700'>*</span>:</label>
                    <select 
                    name="leaveType" 
                    id="leaveType"
                    className='p-1 w-fit focus:outline-0'
                    value={leaveFormData.leaveType}
                    onChange={handleChange}>
                        <option
                        value=""></option>
                       {leaveTypes.sort().map((item, index)=>(
                        <option 
                        value={item}
                        key={index}>{item}</option>
                       ))}
                    </select>
                </div>

                {!isSubmitted&&<button
                type='submit'
                className='pt-4'>
                    Submit
                </button>}
            </form>
            <ToastContainer/>
        </div>
    )
    }else{
        return null
    }
}

export default RequestForm