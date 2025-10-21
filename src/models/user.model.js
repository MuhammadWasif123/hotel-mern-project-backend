import mongoose from "mongoose";


const userSchema= new Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        },
        verifyOtp:{
            type:String,
            default:""
        },
        verifyOtpExpireAt:{
            type:number,
            default:0
        },
        isAccountVerified:{
            type:Boolean,
            default:false
        },
        resetOtp:{
            type:String,
            default:""
        },
        resetOtpExpireAt:{
            type:number,
            default:0
        },
        role:{
            type:String,
            enum:["user","owner","admin"],
            default:"user"
        }
    },
    {
        timestamps:true
    }
)

export const User= mongoose.model("User",userSchema)