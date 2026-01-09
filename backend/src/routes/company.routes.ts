import { Router } from "express";
import companyController from "../controllers/company.controller";

//Router
const companyRouter = Router()

companyRouter.get('/', companyController.getAllCompany)
companyRouter.post("/", companyController.addCompany)
companyRouter.get('/search', companyController.getCompanyByCode)
companyRouter.get('/registered/search', companyController.IsCompanyRegister)
companyRouter.get("/:id", companyController.getCompanyById)
companyRouter.put("/:id", companyController.updateCompanyById)
companyRouter.delete("/:id", companyController.deleteCompanyById)

export default companyRouter