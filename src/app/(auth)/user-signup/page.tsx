import AuthFormBase from '@/src/components/AuthFormBase'
import React from 'react'

const page = () => {
  return (
    <AuthFormBase 
    h2Title='Welcome, create your account'
    authFormType='signup-step1'/>
  )
}

export default page