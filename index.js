const express=require("express")
require("dotenv").config()
const app=express()

app.use(express.json())

const cors=require("cors")
const { userRoute } = require("./routes/userRoute.route")
const { connection } = require("./db")
const { postRoute } = require("./routes/postRoute.route")
app.use(cors())
app.use("/users",userRoute)
app.use("/posts",postRoute)

app.get("/",async(req,res)=>{
    try {
        
        res.status(200).json({msg:"home page",user})
    } catch (error) {
        res.status(200).json({msg:error})
    }
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server run at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})

