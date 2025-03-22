import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const db = async () => {
   try{
     await mongoose.connect(process.env.MONGO_URL);
     console.log("mongoDB connected successfully")
   }catch(err){
    console.log("mongoDB connection error : ",err);
   }
}

export default db;

export const createJWT = (userId) => {
  const token = jwt.sign({userId: userId.toString()},process.env.JWT_SECRET,{expiresIn:"1d"});
  console.log(token)
  return token;
  // res.cookie("token",token,{
  //   httpOnly:true,
  //   secure:process.env.NODE_ENV !== "development",
  //   sameSite:"none", // protect from CSRF attack
  //   maxAge:1*24*60*60*1000,
  // })
    
  }