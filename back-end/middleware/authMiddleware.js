import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'

const protect=asyncHandler(async(req,res,next)=>{
    let token =req.cookies.jwt;
    if(token){
        try{
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            //Get user from token
            req.user=await User.findById(decoded.userId).select('-password')//password doesn't get returned
            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('not authorized, no token')
    }

})

export {protect}   