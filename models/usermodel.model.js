const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
name : String,
email : String,
gender : String,
pass : String,
age : Number,
city : String,
is_married : Boolean,
})


const Usermodel=mongoose.model("user",userSchema)

module.exports={
    Usermodel
}
