import mongoose from 'mongoose';
const taskSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,"please add a title"]
    },
    description:{
        type:String,
        default:""
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date,
        required:[true,"please add a due date"],
    }

},{
    timestamps:true
})
export default mongoose.model('Task',taskSchema)
