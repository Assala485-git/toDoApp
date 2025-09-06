import asyncHandler from 'express-async-handler'
import Task from '../models/taskModels.js'
//@desc Get tasks
//@route GET /api/goals
//@access Privite
export const getTasks=asyncHandler(async(req,res)=>{ 
    const tasks=await Task.find({user:req.user.id});
    res.status(200).json(tasks);
})
//@desc Get task
//@route GET /api/goals/:id
//@access Privite
export const getTask=asyncHandler(async(req,res,next)=>{  
    const task=await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Error(`task with id ${req.params.id} doesn't exist`);
    }
    if(task.user.toString()!==req.user.id){
        res.status(401);
        throw new Error('user not authorized');
    }
    else{
         res.status(201).json(task);
    }
})
//@desc add task
//@route POST /api/tasks
//@access Privite
export const addTask=asyncHandler(async(req,res,next)=>{  
    const {title,description,dueDate}=req.body;
    if(!title || !dueDate){
        res.status(400);
        throw new Error(`please include all the fields`);
    }
    const newTask=await Task.create({
        user:req.user.id,
        title,
        description,
        dueDate,
        isCompleted:false,
    });
    if (!newTask){
        res.status(400);
        throw new Error(`Error while creating the task`);
    }else{
         res.status(201).json(newTask);
    }
   
})
//@desc update task
//@route PUT /api/goals/:id
//@access Privite
export const updateTask=asyncHandler(async(req,res,next)=>{  
    const task=await Task.findById(req.params.id);
    if(!task){
        res.status(400);
        throw new Error(`task with id ${req.params.id} doesn't exist`);
    }
    if(task.user.toString()!==req.user.id){
        res.status(401);
        throw new Error('user not authorized');
    }
    const newTask=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if (!newTask){
        res.status(400);
        throw new Error(`Error while updating the task`);
    }
    else{
         res.status(201).json(newTask);
    }
})
//@desc delete task
//@route DELETE /api/goals/:id
//@access Privite
export const deleteTask=asyncHandler(async(req,res,next)=>{  
    const task=await Task.findById(req.params.id);
     if(!task){
        res.status(400);
        throw new Error(`task with id ${req.params.id} doesn't exist`);
    }
    if(task.user.toString()!==req.user.id){
        res.status(401);
        throw new Error('user not authorized');
    }
    else{
        await task.deleteOne();
        const tasks=await Task.find() ;
        res.status(200).json(tasks);
    }
})