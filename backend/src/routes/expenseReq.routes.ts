import { Router } from "express";
import expenseReqController from "../controllers/expenseReq.controller";

//Router
const expenseReqRouter = Router()

expenseReqRouter.get('/', expenseReqController.getAllExpenseReq)
expenseReqRouter.post("/", expenseReqController.addExpenseReq)
expenseReqRouter.get('/search', expenseReqController.getExpenseReqByQuery)
expenseReqRouter.get("/:id", expenseReqController.getExpenseReqById)
expenseReqRouter.put("/:id", expenseReqController.updateExpenseReqById)
expenseReqRouter.delete("/:id", expenseReqController.deleteExpenseReqById)

export default expenseReqRouter