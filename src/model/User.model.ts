import mongoose,{Schema,Document} from "mongoose";
import { boolean, string } from "zod";

export interface Message extends Document{
    content:string;
    createdAt:Date;
}

const messageSchema:Schema<Message> =new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    message:Message[];
    isVerified:boolean;
}

const userSchema:Schema<User> =new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,"Email pattern is not matching"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"verifyCode is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verifyCodeExpiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:false
    },
    message:[messageSchema]
})

const userModel =(mongoose.models.User as  mongoose.Model<User>) ||
 (mongoose.model<User>("User",userSchema))
 
 export default userModel
