const {Schema, model} = require('mongoose')
const users = new Schema({
    fullName:{type: String, required: true},
    photoUrl:{type:String},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    theme:{type:Number, default:0, enum:[0,1,2]},
    verifiedUser: {type:Boolean, default: false},
    verifiedToken:String,
    resetToken:String,
    resetDate:{
        type: Date,
        default: new Date(+new Date().setHours(new Date().getHours()+3)),
    },
    viewedProducts:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true},
        date:{
            type: Date,
            default: Date.now,
            required:true},
    }],
    favorites:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true} }],
    comparsion:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true} }],
    listLikeReviews:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref: 'Comments',
            required: true,
            unique: true} }],
    listDislikeReviews:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref: 'Comments',
            required: true,
            unique: true} }],
    basket:[{
        count:{
            type:Number,
            required: true,
            default: 1},
        productId:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true},
        idSeller:{
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true} }],
    orders:[{
        date:{
            type: Date,
            default: Date.now,
            required:true},
        order:[{
            _id:{ type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true},
            nameProduct:{type:String, required:true},
            listSeller:[{
                _id:{ type: Schema.Types.ObjectId,
                    ref: 'Seller',
                    required: true},
                price:{type:Number,required: true},
                count:{type:Number,required: true},
                nameSeller:{type:String, required:true}}]
        }]
    }]
})
module.exports = model('Users', users)