const {Schema, model} = require('mongoose')
const options = new Schema({
    name:{type:String, required:true},
    type:{
        type:Number,
        ref: 'TypeDescription',
        required: true},
    priority:{type:Number,required:true},
    value:String,
    important:{type:Boolean,default:false}
})
module.exports = model('Options', options)