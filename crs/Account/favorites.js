const {Router} = require('express')
const router = Router()
const Users = require('../../modelsDB/users')
const mongoose = require("mongoose");
router.get('/:id',async (req, res) => {
    let products = await Users.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.session.user._id) } },
        { $group: { _id: "$favorites._id"}},
        { $unwind: "$_id"},
        { $lookup: {
                from: "products",
                let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
                    { $project:{_id:1, nameProduct:1, photoURL:1, price:1, depiction:1,classProduct:1}}
                ], as: "_id"}},
        { $match: { "_id.classProduct": mongoose.Types.ObjectId(inferredClass) } },
        { $project:{
                _id: { $first: "$_id._id" },
                nameProduct: { $first: "$_id.nameProduct" },
                photoURL: { $first: "$_id.photoURL" },
                price:{ $first: "$_id.price" },
                depiction:{ $first: "$_id.depiction" },
            }}
    ])
    res.render('favorites', {
        title: 'Избранное',
        favorites: true,
        products,
        options
    })
})
module.exports = router