import mongoose,{Schema} from "mongoose";


const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        default:"normal",
        enum:["high","low","normal","medium"],
    },
    stage:{
        type:String,
        default:"todo",
        enum:["todo","in progress","completed"],
    },
    activities:{
        type:{
            type:String,
            default:"assigned",
            enum:[
                "assigned","started","in progress","bug","completed","bug","completed","commented"
            ]
        },
        activity: String,
        date:{type:Date,default: new Date()},
        by:{type:Schema.Types.ObjectId,ref:"User"},
    },
    subTasks:[
        {
            title:String,
            date:Date,
            tag:String,
        },
    ],
    assets:[String],
    team:[{type:Schema.Types.ObjectId, ref:"User"}],
    isTrashed:{type:Boolean,default:false},   
},
{timestamps:true}
);

const Task = mongoose.model("Task",taskSchema);

export default Task