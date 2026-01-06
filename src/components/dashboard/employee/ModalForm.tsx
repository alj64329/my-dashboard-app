import { APTUser } from '@/src/types/appwriteDb.types'
import React, { ChangeEvent, useState } from 'react'

type Props = {
    employee:APTUser
}

const ModalForm = ({employee}: Props) => {
    const [isEditable, setIsEditable] = useState(false)

    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const input = e.target.value
    }
  return (
    <div>
        <div>
            Name:
            {isEditable?
            <input
            type='text'
            value={employee.name}
            onChange={(e)=>handleChange(e)}
            />
            :<div>{employee.name}</div>}
        </div>
    </div>
  )
}

export default ModalForm