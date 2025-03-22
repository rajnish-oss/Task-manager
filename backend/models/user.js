import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    title:{
        type:String,
        required:true,
        maxLength:20,
        trim:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        required:true,
    },
    task:{
       title:String,
       type:Schema.Types.ObjectId,
       ref:"Task"
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isActive:{
        type:Boolean,
        default:true,
        required:true,
    }
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        console.log("Password not modified, skipping hashing.");
        return next()
    }

    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User",userSchema);

export default User;