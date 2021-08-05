const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Users = require('../../modelsDB/users')
const Description = require('../../modelsDB/description')
router.get('/:id',async (req, res) => {
    let inferredClass = req.params.id
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
    res.render('compare', {
        title: 'Сравнения',
        compare: true,
        products,
        options
    })
})
module.exports = router