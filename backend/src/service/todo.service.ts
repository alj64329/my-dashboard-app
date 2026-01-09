import { Todo, ITodo } from "../models/todo.model";

//get all todos
const getAllTodos = async()=>{
    return await Todo.find()
}

//get todo by id
const getTodoById = async(id:string)=>{
    return await Todo.findById(id)
}

//get all todos by userId
const getMyTodos = async(userId:string)=>{
    return await Todo.find({userId})
}

//get all todos by userId and status
const getMyTodosByStatus = async(userId:string, status:string)=>{
    return await Todo.find({userId, status})
}

//add todos
const addTodos = async(newTodos:Partial<ITodo>)=>{
    const {title, userId,desc, status, priority, due } = newTodos

    if(!title||!userId||!desc||!status||!priority||!due) return

    return await Todo.create({
        userId,
        title,
        desc,
        status,
        priority,
        due: new Date(due)
    })
}

//update todos
const updateTodo = async(id:string, data:Partial<ITodo>)=>{
    return await Todo.findByIdAndUpdate(id, data,{
        new:true
    })
}

//delete todo
const removeTodo = async(id:string)=>{
    return await Todo.findByIdAndDelete(id)
}

export default{
    getAllTodos,
    getTodoById,
    getMyTodos,
    getMyTodosByStatus,
    addTodos,
    updateTodo,
    removeTodo
}