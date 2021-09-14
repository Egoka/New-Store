const {Schema, model} = require('mongoose')
const description = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true},
    option:{
        type: Schema.Types.ObjectId,
        ref: 'Options',
        required: true},
    type:{
        type: Schema.Types.ObjectId,
        ref: 'ClassProducts',
        required: true}
})
module.exports = model('Description', description)