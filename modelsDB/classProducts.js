const {Schema, model} = require('mongoose')
const ClassProducts = new Schema({
    className:{type: String, required: true, unique: true},
    classIco:{type: String, required: true, unique: true}
})
module.exports = model('ClassProducts', ClassProducts)