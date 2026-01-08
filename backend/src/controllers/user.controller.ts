import { Response, Request } from "express";
import userService, { IUserLogin } from "../service/user.service";
import { IUser } from "../models/user.model";

//Get All User
const getAllUsers = async(req:Request, res:Response)=>{
    try{
        const users = await userService.getAll()

        if(!users){
            res.status(500).json({message:"Unable to fetch users"})
            return
        }

        res.status(200).json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({messege:'Server Error'})
    }
}

//Get All User by a companyId or email - query
const findUser = async(req:Request<{},{},{},{companyId:string, email:string}>, res:Response)=>{
    const {companyId, email} = req.query
    try{
        if(companyId && !email){
        const employees = await userService.getByCompanyId(companyId)

        if(!employees){
            res.status(404).json({message:"Unable to fetch employees"})
            return
        }

        res.status(200).json(employees)
        }else{
            const user = await userService.getByEmail(req.query.email)

            if(!user){
                res.status(500).json({message:"No user found"})
                return
            }

            res.status(200).json(user)
        }
    }catch(error){
        console.error(error)
        res.status(500).json({messege:'Server Error'})
    }
}

//get user by id
const getUserById = async(req:Request<{id:string}>,res:Response)=>{
    try{
        const user = await userService.getById(req.params.id)

        if(!user){
            res.status(500).json({message:"User not found"})
            return
        }

        res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({messege:'Server Error'})
    }
}


//create user -sign up
const createUsers = async(req:Request<{},Partial<IUser>>, res:Response)=>{
    const {email, password, name} = req.body

    try{
        if(!name.trim()||!email.trim()||!password.trim()){
            res.status(500).json({
                message:"Missing information"
            })
            return
        }
        const newUser = await userService.add({name,email, password})

        if(!newUser){
            res.status(500).json({message:"Unable to create user"})
            return
        }

        res.status(201).json(newUser)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

//update user
const updateUserById = async(req:Request<{id:string},Partial<IUser>>,res:Response)=>{
    const {name,email, password, position, role, profilePic} = req.body

    try{
        const updatedUser = await userService.update(req.params.id,{
            name,
            email,
            password,
            position,
            role,
            profilePic
        })

        if(!updatedUser){
            res.status(404).json({message:"User not found"})
            return
        }
        res.status(200).json(updatedUser)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"server error"})
    }

}

//log in
const login = async (req: Request<{}, {}, IUserLogin>, res:Response) => {
  const {email, password} = req.body
  try{
    if (!email.trim() || !password.trim()) {
      res.status(400).json({
        message: "Id or password is empty!"
      })
      return
    }

    const user = await userService.login({email, password})
    if(!user){
      res.status(401).json({message:"Invalid credentials!"})
      return
    }
    
    if(req.session){
      req.session.isLoggedIn = true
      req.session.user = {
        _id:user._id,
        name:user.name,
        companyId:user.companyId,
        role:user.role,
        position: user.position,
        profilePic:user.profilePic
      }
    }

    res.status(200).json({
      message: "Login successful!",
      user
    })

  }catch(err){
    console.error(err)
    res.status(500).json({message: "Server error"})
  }

}

//Check auth
const checkAuth = (req: Request, res: Response) => {
  if(!req.session || !req.session.user){
    res.status(401).json({
      message: "You are not allowed to access this"
    })
  }else{
    res.status(200).json(req.session.user)
  }
  
}

// Logout
const logout = (req: Request, res: Response) => {
  if(req.session) {
    req.session = null
  }
  res.status(200).json({
    message: "Logout successful"
  })
}

//Delete user by id
const deleteUser = async(req: Request<{id: string}>, res:Response ) => {
  try{
    const deletedUser = await userService.remove(req.params.id)
    if(!deletedUser) {
      res.status(404).json({
        message: "User not found!"
      })
      return
    }
    res.status(200).json(deletedUser)
  }catch(err){
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export default{
    getAllUsers,
    findUser,
    getUserById,
    createUsers,
    updateUserById,
    login,
    checkAuth,
    logout,
    deleteUser
}