"use client"
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../features/auth/auth.features";

export default function Home() {
  const userInfo= useContext(UserContext)

  const loggedInUser = userInfo?.loggedInUser
  const setLoggedInUser = userInfo?.setLoggedInUser
  console.log(loggedInUser)

  return (
    <div className="flex justify-center pt-20">
      <div>
        <Link 
        href="/admin-signup"
        className="bg-(--color-second-green) py-3 px-[1.3rem] rounded-3xl text-white font-karla font-bold">
        Get Started
        </Link>
        <div className="text-grey-200 pt-16 text-center">Already have an account? 
          <Link
          href="/login"
          className="text-second-green ps-2">Log in</Link>
        </div>
        {/* Temporary Log out */}
        <div className="text-grey-200 pt-16 text-center">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
