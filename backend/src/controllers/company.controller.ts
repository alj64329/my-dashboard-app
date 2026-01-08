import { Request, Response } from "express";
import { ICompany } from "../models/company.model";
import companyService from "../service/company.service";

//Get all companies
const getAllCompany = async(req: Request, res: Response) => {
  try{
    const companies = await companyService.getCompanies()
    res.status(200).json(companies)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get company by id
const getCompanyById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const company = await companyService.getByCompanyId(req.params.id)
    if(!company) {
      res.status(404).json({message: "Company not found"})
      return
    }
    res.status(200).json(company)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Company by Company code
const getCompanyByCode = async(req: Request<{},{},{}, {company_code: string}>, res: Response) => {
  try{
    const company = await companyService.getByCode(req.query.company_code)
    if(!company) {
      res.status(404).json({message: "Company not found"})
      return
    }
    res.status(200).json(company)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create Company
const addCompany = async(req: Request<{}, ICompany>, res: Response) => {
  const {company_name} = req.body
  console.log(company_name)

  try{
    const newCompany = await companyService.addCompany({company_name})
    if(!newCompany) {
      res.status(500).json({message: "Unable to add Company"})
      return
    }
    res.status(201).json(newCompany)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update Company by id
const updateCompanyById = async(req: Request<{id: string}, Partial<ICompany>>, res: Response) => {
  const {company_name, adminId, company_code} = req.body
  try{
    const updatedCompany = await companyService.updateComapny(req.params.id, {company_name, adminId, company_code})

    if(!updatedCompany) {
      res.status(500).json({message: "Unable to update Company"})
      return
    }
    res.status(200).json(updatedCompany)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete Company by id
const deleteCompanyById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedCompany = await companyService.removeCompany(req.params.id)
    if(!deletedCompany) {
      res.status(500).json({message: "Unable to delete Company"})
      return
    }
    res.status(200).json(deletedCompany)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllCompany,
    getCompanyById,
    getCompanyByCode,
    addCompany,
    updateCompanyById,
    deleteCompanyById
}