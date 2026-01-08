import { Router } from "express";
import todoController from "../controllers/todo.controller";
//Router
const todoRouter = Router()

todoRouter.get('/', todoController.getAllTodo)
todoRouter.post("/", todoController.addTodo)
todoRouter.get('/search', todoController.getTodoByQuery)
todoRouter.get("/:id", todoController.getTodoById)
todoRouter.put("/:id", todoController.updateTodoById)
todoRouter.delete("/:id", todoController.deleteTodoById)

export default todoRouter