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
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server run at ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})

