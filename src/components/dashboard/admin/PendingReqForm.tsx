import React from 'react'
import { PendingTableExpense, PendingTableLeave } from './AdminTable'
import { DatasetType } from '@/src/app/(dashboard)/admin/page'


type Props = {
    dataset:DatasetType
}

const PendingReqForm = ({dataset}: Props) => {

    if(dataset.type ==="expense"){

        return (
            <div className='p-5 font-medium'>
                <div className='text-center'>Expense Request</div>

                <div className='flex flex-col py-6 gap-4'>
                    <div>
                        <span className='font-bold'>
                            Employee Name: </span>
                        <span>{dataset.data.employeeName}</span>
                    </div>
                    <div>
                        <span className='font-bold'>
                            Expense Type:</span>
                        <span>{dataset.data.expenseType}</span>
                    </div>
                    <div>
                        <span
                        className='font-bold'>
                            Amount:</span> 
                        <span>$ {dataset.data.amount}</span>
                    </div>

                    <div>
                        Status
                    </div>

                    <div>Save</div>
                </div>
            </div>
        )
    }
    else if(dataset.type ==="leave"){
        return (
            <div className='p-5 font-medium'>
                <div className='text-center'>
                    Leave Request
                </div>

                <div className='flex flex-col  py-6 gap-4'>
                    <div>
                        <span className='font-bold'>Employee Name:</span> 
                        <span>{dataset.data.employeeName}</span>
                    </div>
                    <div className='flex justify-around'>
                        <div>
                            <span className='font-bold'>From:</span>
                            <span>{dataset.data.from}</span>
                        </div>
                        <div>
                            <span className='font-bold'>To:</span>
                            <span>$ {dataset.data.to}</span>
                        </div>
                    </div>
                    <div>
                        Status
                    </div>

                    <div>Save</div>
                </div>
            </div>
        )
        }
  else{
    return null
  }
}

export default PendingReqForm