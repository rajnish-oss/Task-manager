import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { createJWT } from '../utils/db.js';
import Notice from '../models/notification.js';

export const registerUser = async(req,res)=>{
   
   try{
    const {title,name,email,password,role} = req.body;
    const userExist = await User.findOne({email})
    console.log(email)
    const isAdmin = email.includes('.admin')
     


    if(userExist){
        return res.status(400).json({
            status:false,
            message:"user alredy exist",
        })
    }

    const user = await User.create({
        title,
        name,
        email,
        password,
        isAdmin,
        role,
    })


    if(user){
        let token=createJWT(user._id)
        isAdmin?createJWT(res,user._id):null;
        user.password = undefined
        res.status(200).json({user,token});

        // return res.render("dashboard")
    }else{
        return res.status(400).json({
            status:false,
            message: "invalid user data"
        })
    }

    console.log("This is the body")
    console.log(req.body)

   }catch(error){
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
   }
}

export const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({status:false,message:
                "Invalid email or password"
            })
        }

        if(!user?.isActive){
            return res.status(401).json({status:false,message:"User account has been deactivated"})
        }

        const isMatch = await user.matchPassword(password)

        if(user && isMatch){
            let token = createJWT(user._id);
            
            user.password = undefined

            res.status(200).json({user,token})
        }else{
            return res.status(400).json({status:false,message:"invalid username or password"})
        }

    }catch(error){
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const logoutUser = async(req,res) =>{
    try{
        res.cookie("token","",{
            httpOnly:true,
            expires:new Date(0),
        });

        res.status(200).json({message:"Logout successful"});
    }catch(error){
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const getTeamList = async(req,res) =>{
    try{
        const user = await User.find().select("name title email role isActive")

        res.status(200).json({user})
    }catch(error){
        console.log("getListItem error =",error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const getNotificationList = async(req,res)=>{
    try {
        const {userId} = req.user;

        const notice = await Notice.findOne({
            team:userId,
            isRead: {$nin: {userId}},
        }).populate("task","title");

        res.status(200).json(notice);
    } catch (error) {
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const updateUserProfile = async(req,res) => {
    try {
        const {userId,isAdmin} = req.user
        const {_id} = req.body

        console.log(req.user)
        console.log(req.body)

        const id = isAdmin && userId ===_id
         ? userId
         : isAdmin && userId !== _id
         ? _id
         : userId

         const user = User.findOne(id)

         if(user){
            user.name = req.body.name || user.name;
            user.title = req.body.title || user.title;
            user.role = req.body.role || user.role;

            const updatedUser = await user.save()

            user.password = undefined

            res.status(200).json({
                status:true,
                message:"profile updated successfully",
                user:updatedUser
            })
         }
    } catch (error) {
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const markNotificationRead = async(req,res) =>{
    try {
        const {userId} = req.user;
        const {isReadType,id} = req.query;

        if(isReadType === "all"){
            await Notice.updateMany(
                {team:userId,isRead:{$nin:[userId]}},
                {$push: {isRead:userId}},
                {new:true}
            );
        }else{
            await Notice.findOneAndUpdate(
                {_id:id,isRead:{$nin:[userId]}},
                {$push:{isRead:userId}},
                {new:true}
            );
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const changeUserPassword = async(req,res)=>{
   try {
    const {userId} = req.user

    const user = await User.findById(userId);

    if(user){
        user.password = req.body.password;

        await user.save()

        user.password = undefined

        res.status(201).json({status:true,message:"password changed successfully"})
    }else{
        res.status(400).json({message:"user not found"})
    }
   } catch (error) {
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
   }
}

export const activateUserProfile = async(req,res)=>{
    try {
        const {id} = req.params

        const user = await User.findById(id);

        if(user){
            user.isActive = res.body.isActive;

            await user.save()

            res.status(201).json({status:true,message:`User has been ${user?.isActive ? "activated" : "disabled"}`})
        }else{
            res.status(400).json({message:"user not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}

export const deleteUserProfile = async(req,res)=>{
    try {
        const {id} = req.params

        await User.findByIdAndDelete(id)

        res.status(201).json({message:"user had been deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({status:false,message:error.message})
    }
}