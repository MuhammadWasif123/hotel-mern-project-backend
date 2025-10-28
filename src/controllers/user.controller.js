import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password } = req.body

    if(
        [username,email,password].some((field)=>
            field?.trim() === ""
        )
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email and username already exist")
    }

    console.log("Checking required files for testing",req.files)

    



    
})





export {
    registerUser
}