const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Comments = require('../../modelsDB/comments')
const Users = require('../../modelsDB/users')
const closedPage = require('../../middleware/auth')
router.get('/', closedPage, async(req, res) => {
    const recall = await Comments
        .find({author:req.session.user._id},
            "_id product photo rating date like dislike advantages limitations comment")
        .populate('product', '_id nameProduct')
        .sort({date:-1}).lean()
    let userNotes = await Users.aggregate([
        { "$match": { "_id": mongoose.Types.ObjectId(req.session.user._id) }},
        { "$project": {"_id":0,
                "listLikeReviews": {"$filter": {input: "$listLikeReviews", as: "item",
                        cond: { $in: [ "$$item._id",
                                [...recall.map(review=> mongoose.Types.ObjectId(review._id.toString()))] ]} }},
                "listDislikeReviews": {"$filter": {input: "$listDislikeReviews", as: "item",
                        cond: { $in: [ "$$item._id",
                                [...recall.map(review=> mongoose.Types.ObjectId(review._id.toString()))] ]} }} }},
        {"$project":{"listDislikeReviews":{"_id":1}, "listLikeReviews":{"_id":1}}} ])
    userNotes = userNotes[0]
    recall.forEach((review,key)=>{
        recall[key].likeStatus = userNotes.listLikeReviews.some(likeReviews=>
            likeReviews._id.toString()==review._id.toString())
        recall[key].dislikeStatus = userNotes.listDislikeReviews.some(dislikeReviews=>
            dislikeReviews._id.toString()==review._id.toString())})
    res.render('reviewsUser', {
        link:'/reviews/',
        title: 'Отзывы',
        reviews: true,
        recall
    })
})
module.exports = router