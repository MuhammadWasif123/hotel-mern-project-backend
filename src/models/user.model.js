import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"


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
        avatar:{
            type:String,
            required:true
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
            type:Number,
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
            type:Number,
            default:0
        },
        role:{
            type:String,
            enum:["user","owner","admin"],
            default:"user"
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)


userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

   this.password = await bcrypt.hash(this.password, 10)
   next()
})  


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)

}



export const User= mongoose.model("User",userSchema)