import { IUser, User } from "../models/user.model";
import {v4 as uuidv4} from 'uuid'
import bcrypt from 'bcrypt'
import { log } from "console";

//get all users
const getAll = async()=>{
    return await User.find()
}

//get user by id
const getById = async(id:string)=>{
    return await User.findById(id)
}

//get users by companyId
const getByCompanyId = async(companyId:string)=>{
    return await User.find({companyId})
}

//get user by email for login
const getByEmail = async(email:string)=>{
    return await User.findOne({email}).select('+password')
}

//create user
const add = async (newUser:Partial<IUser>)=>{
    const {email, password, name} = newUser
    if(!email ||!password||!name) return

    const hasedPassword = await bcrypt.hash(password,12)

    return await User.create({
        email,
        name,
        password:hasedPassword
    })
}

//update user
const update = async(id:string, data:Partial<IUser>)=>{
    return await User.findByIdAndUpdate(id, data,{new:true})
}

//delete user
const remove = async(id:string)=>{
    return await User.findByIdAndDelete(id)
}


export interface IUserLogin{
    email:string
    password:string
}

//login user
const login = async(details:IUserLogin)=>{
    const {email, password} = details
    const foundUser = await getByEmail(email)

    if(!foundUser) return false

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if(!isMatch) return false

    return foundUser
}

export default{
    getAll,
    getById,
    getByCompanyId,
    getByEmail,
    add,
    update,
    remove,
    login
}