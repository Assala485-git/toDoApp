import express from 'express';
import {login,register,logout} from '../controllers/userController.js'
const router=express.Router();
router.post('/',register);
router.post('/login',login);
router.post('/logout',logout);
export default router
