import express from 'express';
import {getTasks,getTask,addTask,updateTask,deleteTask} from '../controllers/taskControllers.js';
import {protect} from '../middleware/authMiddleware.js';
const router=express.Router(); 

router.route('/').get(protect,getTasks).post(protect,addTask)

router.route('/:id').get(protect,getTask).put(protect,updateTask).delete(protect,deleteTask);

export default router


