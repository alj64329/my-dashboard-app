
import Link from "next/link";


export default function Home() {


  const logoutHandler = ()=>{

  }
  

  return (
    <div className="flex justify-center pt-20">
      <div>
        <Link 
        href="/admin-signup/step1"
        className="bg-(--color-second-green) py-3 px-[1.3rem] rounded-3xl text-white font-karla font-bold">
        Get Started
        </Link>
        <div className="text-grey-200 pt-16 text-center">Already have an account? 
          <Link
          href="/login"
          className="text-second-green ps-2">Log in</Link>
        </div>
        {/* Temporary Log out */}
        {/* {loggedInUser&&
        <div className="text-grey-200 pt-16 text-center">
          <button  className="cursor-pointer" onClick={logoutHandler}>Logout</button>
        </div>} */}
      </div>
    </div>
  );
}
