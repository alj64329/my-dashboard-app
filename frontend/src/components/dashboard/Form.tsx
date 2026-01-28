
import React, { FormEvent, useState } from 'react'


type Props<T extends object> = {
    defaultData:T //empty data with property
}

const Form = <T extends object>({defaultData}: Props<T>) => {
    const [formData, setFormData] =useState(defaultData)
    const submitHandler =(e:FormEvent)=>{
        e.preventDefault()

    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <div>
                <label>Name:</label>
                <input type="text" />
            </div>

            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default Form;