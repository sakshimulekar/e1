const express=require("express")
const { Usermodel } = require("../models/usermodel.model")
const bcrypt = require('bcrypt');
const userRoute=express.Router()
var jwt = require('jsonwebtoken');
const { Bsmodel } = require("../models/bl.model");

userRoute.get("/",async(req,res)=>{
    try {
        const user=await Usermodel.find()
        res.status(200).json({msg:"home page",user})
    } catch (error) {
        res.status(200).json({msg:error})
    }
})

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,pass,age,city,is_married}=req.body
    try {
        const existUser=await Usermodel.find({email})
        if(existUser){
            return res.status(400).json({msg:"User already exist, please login"})
        }
        else{
            bcrypt.hash(pass, 5, async(err, hash) =>{
                if(hash){
                    const user=new Usermodel({name,email,gender,pass:hash,age,city,is_married})
                    await user.save()
                    return res.status(200).json({msg:"User register successfully",user})
                }
                else{
                    return res.status(400).json({msg:"something went wrong"})
                }
            });
        }
    } catch (error) {
        return res.status(400).json({msg:error})
    }
})

userRoute.post("/login",async(req,res)=>{
    try {
        const {email,pass}=req.body
        const user=await Usermodel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, async(err, result)=>{
                if(result){
                    
                    var token = jwt.sign({userID:user._id,user:user.name }, 'eval');
                    return res.status(200).json({msg:"login successfully",token,user})
                }
                else{
                    return res.status(400).json({msg:"wrong credential",err})
                }
            });
        }
        else{
            return res.status(400).json({msg:"user not found, please login!!"})
        }
    } catch (error) {
        return res.status(400).json({msg:error})
    }
})

userRoute.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if(token){
            await Bsmodel.updateMany({}, { $push: {blacklist:[token]}})
            return res.status(200).json({msg:"logout successfully"})
        }

    } catch (error) {
        return res.status(400).json({msg:error})
    }
})
module.exports={
    userRoute
}