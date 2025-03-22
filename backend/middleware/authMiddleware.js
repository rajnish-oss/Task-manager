import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const protectRoute = async(req,res,next)=>{
    try{
        let token
        // let token = req.cookie.token;
        // if(token){
        //     const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        //     const resp = await User.findById(decodedToken.userId).select("isAdmin email");
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        console.log(token)
        if(!token){
            res.status(401).json({status:false,message:"is not provided"})
        }

        const decodedToken =  jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decoded Token:", decodedToken);

        const user = await User.findById(decodedToken.userId).select("isAdmin email");

        if (!user) {
            return res.status(401).json({ status: false, message: decodedToken });
        }

            req.user ={
                email:user.email,
                isAdmin:user.isAdmin,
                userId:user._id,
            };
            next();
    // }
        }catch(error){
            console.log("token error:",error)
            return res.status(401)
                      .json({status:false,message:"Not authorized,Try agian"});
        }
    }

const isAdminRoute = async(req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        return res.status(401).json({
            status:false,
            message:"adim authentication try logging in as an admin"
        })
    }
}    

export {protectRoute,isAdminRoute}