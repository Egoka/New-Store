const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Users = require('../../modelsDB/users')
const Description = require('../../modelsDB/description')
router.get('/:id',async (req, res) => {
    let options = await Users.aggregate([
        { $match: { _id : mongoose.Types.ObjectId(req.session.user._id)} },
        { $group: { _id: "$comparsion._id"}},
        { $unwind: "$_id"},
        { $lookup: {
                from: "products",
                let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
                    { $project:{classProduct:1}}
                ], as: "id"}},
        { $group: { _id: "$id.classProduct"}},
        { $lookup: {from: "classproducts", localField: "_id", foreignField: "_id", as: "_id"}},
        { $sort : {"_id.priority":1 } },
        { $project:{
                _id: { $first: "$_id._id" },
                className:{ $first: "$_id.className" },
                classIco:{ $first: "$_id.classIco" },
            }} ])
    let inferredClass
    if(options.length>0){
        if(req.params.id==='default') {
            inferredClass = options[0]._id.toString()
        }else{inferredClass = req.params.id}}
    let products = [...await Users.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.session.user._id) } },
        { $group: { _id: "$comparsion._id"}},
        { $unwind: "$_id"},
        { $lookup: { from: "products", let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
                    { $project:{_id:1,classProduct:1}}
                ], as: "_id"}},
        { $match: { "_id.classProduct": mongoose.Types.ObjectId(inferredClass) } },
        { $project:{ _id: { $first: "$_id._id" } }}
    ])].map(product => product._id.toString())
    if(products.length!==0){
        products = await Description.aggregate([
            {"$match": {"product":{ "$in":[...products.map(product=>mongoose.Types.ObjectId(product))]}}},
            {"$lookup": {
                    from: "options", localField: "option", foreignField: "_id", as: "option"}},
            {"$unwind": {path: "$option", preserveNullAndEmptyArrays: true}},
            {"$sort": { "option.priority":1 } },
            {"$group": {"_id": {"product": "$product", "type": "$option.type"},
                    "option":{$push: {_id:"$option._id", name:"$option.name",
                            priority: "$option.priority", value:"$option.value"}},
                    "type":{$first:"$option.type"} }},
            {"$sort": { "type" : 1,"option.priority":1 } },
            {"$lookup": {
                    from: "typedescriptions", localField: "type", foreignField: "_id", as: "type",}},
            {"$group": {"_id" : "$_id.product",
                    "description":{$push: {"type":"$type", "option": "$option"}} }},
            { "$lookup": {
                    from: "products", let: { id: "$_id" },
                    pipeline: [
                        { "$match": { $expr: { $eq: ["$_id", "$$id"] }}},
                        { "$project":{nameProduct :1,photoURL:1, price:1}}
                    ], as: "product"}},
            { "$project":{
                    "_id": { $first: "$product._id" },
                    "nameProduct":{ $first: "$product.nameProduct" },
                    "photoURL":{ $first: "$product.photoURL" },
                    "price":{ $first: "$product.price" },
                    "description": {
                        $map: {input: "$description", as: "sec",
                            in: {"idSection":{ $first: "$$sec.type._id" },
                                "nameSection":{ $first: "$$sec.type.typeName" },
                                "option":"$$sec.option"}}} }} ])
    }
    res.render('compare', {
        title: 'Сравнения',
        compare: true,
        products,
        options
    })
})
module.exports = router