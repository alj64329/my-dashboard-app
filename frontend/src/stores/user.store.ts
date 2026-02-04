import { create } from "zustand"
import { persist } from "zustand/middleware";
import { Role, User } from "../types/index.types";

type UserStore ={
    loggedInUser:User| null
    setLoggedInUser:(user:User)=>void
    logoutUser:()=>void
}

const testUser:User={
        _id: "696063b7d4d049e1fe466e5c",
        email: "Companya@test.com",
        name: "Jane Dow",
        position: "Admin Assistant",
        role: Role.employee,
        profilePic: "",
        companyId: "69601bb9950cb89b80d9c574",
        password:""
}

export const useUser = create<UserStore>()(
persist(
    ((set, get)=>({

        loggedInUser:testUser,
        setLoggedInUser:(user:User)=>{
            set({loggedInUser:user})
        },
        logoutUser:()=>{
            set({loggedInUser: null})
        }

})),{
    name:"user-storage"
}
)
)