import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path:'./.env'
})


app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is Running at port : ${process.env.PORT}`)
})

app.get('/',(req,res)=>res.send("API Working Correctly"))
