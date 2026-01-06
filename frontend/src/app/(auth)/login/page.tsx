import AuthFormBase from '@/src/components/AuthFormBase'
import React from 'react'

const page = () => {
  return (
    <AuthFormBase
    h2Title='Welcome back, log into your account'
    authFormType='login'/>
  )
}

export default page