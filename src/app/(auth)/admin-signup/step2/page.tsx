
import AuthFormBase from '@/src/components/AuthFormBase'


const page = () => {
  const registrationData =JSON.parse(localStorage.getItem("registrationData")||"{}")
  return (
    <AuthFormBase h2Title='Choose your password' authFormType="signup-step2" data ={registrationData}/>
  )
}

export default page