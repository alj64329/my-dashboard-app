import { Router } from "express";
import projectController from "../controllers/project.controller";

//Router
const projectRouter = Router()

projectRouter.get('/', projectController.getAllProject)
projectRouter.post("/", projectController.addProject)
projectRouter.get('/search', projectController.getProjectByQuery)
projectRouter.get("/:id", projectController.getProjectById)
projectRouter.put("/:id", projectController.updateProjectById)
projectRouter.delete("/:id", projectController.deleteProjectById)

export default projectRouter