const {Schema, model} = require('mongoose')
const product = new Schema({
    nameProduct:{type:String, required:true},
    classProduct:{
        type: Schema.Types.ObjectId,
        ref: 'ClassProducts',
        required: true},
    photoURL:String,
    colorBackground:{type:String,default:'#8c8c8c'},
    stars:{type:Number,enum:[0,1,2,3,4,5]},
    price:Number,
    depiction:[{items: String}],
    listSeller:[{
        idSeller:{
            type: Schema.Types.ObjectId,
            ref: 'Seller',
            required: true},
        price:Number,
        paymentFormat:Number,
        popularity:{type:Number, default:0}
    }]
})
module.exports = model('Product', product)