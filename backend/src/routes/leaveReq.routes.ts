import { Router } from "express";
import leaveReqController from "../controllers/leaveReq.controller";

//Router
const leaveReqRouter = Router()

leaveReqRouter.get('/', leaveReqController.getAllLeaveReq)
leaveReqRouter.post("/", leaveReqController.addLeaveReq)
leaveReqRouter.get('/search', leaveReqController.getLeaveReqByQuery)
leaveReqRouter.get("/:id", leaveReqController.getLeaveReqById)
leaveReqRouter.put("/:id", leaveReqController.updateLeaveReqById)
leaveReqRouter.delete("/:id", leaveReqController.deleteLeaveReqById)

export default leaveReqRouter