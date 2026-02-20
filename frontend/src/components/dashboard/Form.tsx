
import React, { FormEvent, useState } from 'react'


type Props = {
    subhead:string,

}

const Form = ({subhead}:Props) => {
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