const {Schema, model} = require('mongoose')
const menus = new Schema({
    nameCategory:{type: String, required: true},
    iconCategory:{type: String, required: true},
    listCategory:[{
        idClass:{
            type: Schema.Types.ObjectId,
            ref: 'ClassProducts',
            required: true},
        photoURL:{type: String, required: true},
        nameType:{type: String, required: true},
        listSearch:[{
            nameSearch:{type: String, required: true},
            photoURL:{type: String, required: true},
            search:[{
                nameOption:{type: String, required: true},
                idOption:{
                    type: Schema.Types.ObjectId,
                    ref: 'Options',
                    required: true},
            }]
        }]
    }]
})
module.exports = model('Menus', menus)