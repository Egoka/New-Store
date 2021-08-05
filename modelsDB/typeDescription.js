const {Schema, model} = require('mongoose')
const TypeDescription = new Schema({
    _id:Number,
    typeName:{type: String, required: true, unique: true}
})
module.exports = model('TypeDescription', TypeDescription)