import User from '../models/userModels.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
export const login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
     if(!email || !password){
        return res.status(400).json({message:'please enter all the fields'});
    }
    const user=await User.findOne({email});
     if(user && (await user.matchPassword(password))){
        generateToken(res,user.id);
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid data')
    }
})
export const register=asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:'please enter all the fields'});
    }
    const userExist=await User.findOne({email});
    if(userExist){
        return res.status(400).json({message:'user already exist'})
    }
    const user=await User.create({name,email,password});
    if(user){
        generateToken(res,user.id);
        res.status(201).json({
            id:user.id,
            name:user.name,
            email:user.email,
        })
    }
    else{
        res.status(400);
        throw new Error('Invalid data')
    }
})
export const logout=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        ehttpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully' })
})