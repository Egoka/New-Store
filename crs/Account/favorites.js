const {Router} = require('express')
const router = Router()
const Users = require('../../modelsDB/users')
const mongoose = require("mongoose");
const closedPage = require('../../middleware/auth')
router.get('/:id', closedPage, async (req, res) => {
    let options = await Users.aggregate([
        { $match: { _id : mongoose.Types.ObjectId(req.session.user._id)} },
        { $group: { _id: "$favorites._id"}},
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
    let products = await Users.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.session.user._id) } },
        { $group: { _id: "$favorites._id"}},
        { $unwind: "$_id"},
        { $lookup: {
                from: "products",
                let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
                    { $project:{_id:1,nameProduct:1,photoURL:1,
                            classProduct:1,stars:1,
                            date:1,price:1,depiction:1}}
                ], as: "_id"}},
        { $match: { "_id.classProduct": mongoose.Types.ObjectId(inferredClass) } },
        { $project:{
                _id: { $first: "$_id._id" },
                nameProduct: { $first: "$_id.nameProduct" },
                photoURL: { $first: "$_id.photoURL" },
                colorBackground: { $first: "$_id.colorBackground" },
                stars: { $first: "$_id.stars" },
                rating: { $first: "$_id.rating" },
                date: { $first: "$_id.date" },
                price:{ $first: "$_id.price" },
                depiction:{ $first: "$_id.depiction" } }},
        { $addFields: {
                daysCount: { $cond: [
                        { $lte: [
                                {$round: {$divide: [
                                            {$subtract: [ new Date(), "$date"]}, 86400000] }},
                                30 ] }, true, false ] } } }]) //30 days
    res.render('favorites', {
        link:'/favorites/default',
        title: 'Избранное',
        favorites: true,
        products,
        options
    })
})
module.exports = router