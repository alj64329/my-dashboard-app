import { Router } from "express";
import teamController from "../controllers/team.controller";

//Router
const teamRouter = Router()

teamRouter.get('/', teamController.getAllTeam)
teamRouter.post("/", teamController.addTeam)
teamRouter.get('/search', teamController.getTeamByQuery)
teamRouter.get("/:id", teamController.getTeamById)
teamRouter.put("/:id", teamController.updateTeamById)
teamRouter.delete("/:id", teamController.deleteTeamById)

export default teamRouter