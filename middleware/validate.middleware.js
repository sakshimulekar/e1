var jwt = require('jsonwebtoken');
const { Bsmodel } = require('../models/bl.model');


const validate=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        if(token){
            // let exist=await Bsmodel.find({
            //     blacklist: { $in: token}
            // })
            // if(exist){
            //     res.status(200).json({msg:"login again"})
            // }
            const decoded=jwt.verify(token,"eval")
            if(decoded){
                req.body.userID=decoded.userID
                req.body.user=decoded.user
                console.log(decoded.userID,decoded.user)
                next()
            }
            else{
                res.status(400).json({msg:"subscription expired"})
            }
        }
        else{
            res.status(200).json({msg:"access denied"})
        }
    } catch (error) {
        res.status(200).json({msg:error})
    }
}

module.exports={
    validate
}