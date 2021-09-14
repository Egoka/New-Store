const {Schema, model} = require('mongoose')
const comment = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true},
    author:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true},
    photo:String,
    rating:{type:Number, required:true},
    topicality:{type:Number, required:true},
    date:{type: Date, default: Date.now, required:true},
    like: {type:Number, default:0},
    dislike:{type:Number, default:0},
    advantages:String,
    limitations:String,
    comment:String,
})
module.exports = model('Comments', comment)