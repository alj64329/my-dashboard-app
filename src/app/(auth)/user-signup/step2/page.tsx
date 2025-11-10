import AuthFormBase from '@/src/components/AuthFormBase'
import React from 'react'

const page = () => {
  return (
    <AuthFormBase
    h2Title={`Choose your password`}
    authFormType='signup-step2'/>
  )
}

export default page