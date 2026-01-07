import { ICompany, Company } from "../models/company.model";
import {nanoid} from 'nanoid'

//get all comapnay
const getCompanies = async ()=>{
    return await Company.find()
}

//get company by company_code
const getByCode = async(code:string)=>{
    return await Company.findOne({company_code:code})
}

const getByCompanyId = async(companyId:string)=>{
    return await Company.findById(companyId)
}

//create comapnay
const addCompany = async(newCompany:Partial<ICompany>)=>{
    const {comapny_name} = newCompany
    if(!comapny_name) return

    //Generate code
    const code = nanoid(10)

    return await Company.create({
        comapny_name,
        company_code:code
    })
}

//update company
const updateComapny = async(id:string, data:Partial<ICompany>)=>{
    return await Company.findByIdAndUpdate(id, data,{
        new:true
    })
}

//delete company
const removeCompany = async(id:string)=>{
    return await Company.findByIdAndDelete(id)
}

export default{
    getCompanies,
    getByCode,
    getByCompanyId,
    addCompany,
    updateComapny,
    removeCompany
}