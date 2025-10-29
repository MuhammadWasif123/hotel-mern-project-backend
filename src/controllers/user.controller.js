import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";


const registerUser = asyncHandler(async(req,res)=>{
    const {userName,email,password } = req.body

    if(
        [userName,email,password].some((field)=>
            field?.trim() === ""
        )
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({
        $or:[{userName},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email and username already exist")
    }

    console.log("Checking required files for testing",req.files)

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(`Response from cloudinary ${avatar.url}`)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        password,
        avatar: avatar.url
    })
    console.log(`This is the response from the  user object we are saving in the database ${user}`)


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    
})



export {
    registerUser
}