const {Schema, model} = require('mongoose')
const seller = new Schema({
    fullName:{type: String, required: true},
    photoUrl:{type:String},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    theme:{type:Number, default:0, enum:[0,1,2]},
    verifiedUser:{type:Boolean, default: false},
    products:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true} }],
    recallStar:{type:Number,enum:[0,1,2,3,4,5],default:0},
})
module.exports = model('Seller', seller)