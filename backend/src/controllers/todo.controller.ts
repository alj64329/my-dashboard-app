import { Request, Response } from "express";
import { ITodo } from "../models/todo.model";
import todoService from "../service/todo.service";

//Get all todos
const getAllTodo = async(req: Request, res: Response) => {
  try{
    const todos = await todoService.getAllTodos()
    res.status(200).json(todos)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Todo by id
const getTodoById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const Todo = await todoService.getTodoById(req.params.id)
    if(!Todo) {
      res.status(404).json({message: "Todo not found"})
      return
    }
    res.status(200).json(Todo)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

//Get Todo by userId - query
const getTodoByQuery = async(req: Request<{},{},{}, {userId: string, status:string}>, res: Response) => {
    const {userId, status} = req.query
  try{

    if(!status){
        const todos = await todoService.getMyTodos(userId)
        if(!todos) {
            res.status(404).json({message: "Todos not found"})
            return
        }
            res.status(200).json(todos)
    }else{
        const todos = await todoService.getMyTodosByStatus(userId, status)
        if(!todos) {
            res.status(404).json({message: "Todos not found"})
            return
        }
            res.status(200).json(todos)
    }

  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Create Todo
const addTodo = async(req: Request<{}, ITodo>, res: Response) => {
  const {title, userId,desc, status, priority, due } = req.body

  try{
    const newTodo = await todoService.addTodos({title, userId,desc, status, priority, due })
    if(!newTodo) {
      res.status(500).json({message: "Unable to add Todo"})
      return
    }
    res.status(201).json(newTodo)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
  
}

//Update Todo by id
const updateTodoById = async(req: Request<{id: string}, Partial<ITodo>>, res: Response) => {
  const {title, userId,desc, status, priority, due } = req.body
  try{
    const updatedTodo = await todoService.updateTodo(req.params.id, {title, userId,desc, status, priority, due })

    if(!updatedTodo) {
      res.status(500).json({message: "Unable to update Todo"})
      return
    }
    res.status(200).json(updatedTodo)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// Delete Todo by id
const deleteTodoById = async(req: Request<{id: string}>, res: Response) => {
  try{
    const deletedTodo = await todoService.removeTodo(req.params.id)
    if(!deletedTodo) {
      res.status(500).json({message: "Unable to delete Todo"})
      return
    }
    res.status(200).json(deletedTodo)
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }

}

export default{
    getAllTodo,
    getTodoById,
    getTodoByQuery,
    addTodo,
    updateTodoById,
    deleteTodoById
}