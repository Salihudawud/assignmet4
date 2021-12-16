import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import myTodoModel from "./modules/todo_schema.js";
dotenv.config();
const app = express();
const port = process.env.port || 3000;
const DB = process.env.DB_URL;
app.use(express.json());


app.get('/todo', async (req,res)=>{
    const getAllTodo = await myTodoModel.find({})
    if(getAllTodo){
        return res.status(200).json({
            status: true,
            message: 'Todo load successful',
            data: getAllTodo
        })
    }else{
        return res.status(404).json({
            status: false,
            message: 'Failed to load todo'
        })
    }
})
 app.get('/todo/:completed', async (req, res)=>{
     const {completed} = req.params

    const getCompleted = await myTodoModel.find({}).where('completed').equals(completed)
    
    if (getCompleted) {
        return res.status(200).json({
            status: true, 
            message: 'Todo update successful', 
            data: getCompleted 
        })
    }
    else{
        return res.status(404).json({
            status: false, 
            message: 'Todo update failed'
        })
    }
 })

app.put('/todo/:id', async (req, res)=> {
    const {completed} = req.body
    const {id} = req.params.id
    const updateTodo =  await myTodoModel.findByIdAndUpdate(req.params.id, req.body)
    if (updateTodo){
        return res.status(200).json({ status: true,
        message: 'Todo update successful',
        data: updateTodo,
})

    }
    else{
        return res.status(404).json({
            status: false,
            message: 'Todo update failed'
        })
    }
})


app.delete('/todo/:id', async (req, res)=>{
    const deleteTodo = await myTodoModel.findByIdAndDelete(req.params.id)
    if (deleteTodo){
        return res.status(200).json({
            status: true,
            message: 'Todo deleted succesful',
            data: deleteTodo,
        })
    }
    else{
        return res.status(404).json({
            status: false,
            message: 'Todo deleted failed',
            data: deleteTodo
        })
    }
})


app.post('/todo',async(req,res)=>{
const {title,description,datetime,completed} = req.body
const addNewTodo = await myTodoModel.create({
    title,
    description,
    datetime,
    completed
})
if(addNewTodo){
    return res.status(200).json({
        status: true,
        message: 'Todo add successful',
        data: addNewTodo
    })
}else{
    return res.status(404).json({
        status: false,
        message: 'Todo add failed',
    })
}
})

try {
mongoose.connect(DB)
console.log('connection succesful')
} catch (error) {
    console.log('connection failed')
}

app.listen(port,function(){
    console.log('app is listening on port '+ port);
})
