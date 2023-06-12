const mongoose=require("mongoose")

const blSchema=mongoose.Schema({
    blacklist:{type:[String]}
},{
    versionKey:false
})

const Bsmodel=mongoose.model("blacklist",blSchema)

module.exports={
    Bsmodel
}