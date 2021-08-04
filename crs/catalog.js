const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Product = require('../modelsDB/product')
const Users = require('../modelsDB/users')
const Comments = require('../modelsDB/comments')
const {filter, products, product, brands, recall,topics, account} = require('./inf/filter.js')
router.get('/',(req, res) => {
    const user = true
    res.render('catalog', {
        title: 'Каталог',
        catalog:true,
        catalogPage: true,
        account,
        user,
        products,
        filters:filter
    })
})
router.get('/:id', async (req, res)=>{
    const product = await Product
        .findById(req.params.id)
        .populate('listSeller.idSeller','_id photoUrl recallStar').lean()
    const countRecall = [...await Comments.aggregate([
        { "$match": { "product":mongoose.Types.ObjectId(req.params.id)}},
        { "$group": { "_id": null, "count": { "$sum":1}}} ])][0]
    product.countRecall =countRecall?countRecall.count:0
    product.listStars = await Comments.aggregate([
        { "$match": { "product":mongoose.Types.ObjectId(req.params.id)}},
        { "$group": { "_id": "$rating", "numberStarRatings": { "$sum":1}}},
        { "$sort" : { "_id" : -1} }]);
    product.listReviews = await Comments
        .find({product:req.params.id},
            "_id author photo rating date like dislike advantages limitations comment")
        .sort({topicality:-1,date:-1}).limit(3)
        .populate('author', '-_id fullName photoUrl verifiedUser').lean()
    if(req.session.isAuthorization) {
        let userNotes = await Users.aggregate([
            { "$match": { "_id": mongoose.Types.ObjectId(req.session.user._id) }},
            { "$project": {"_id":0,
                    "favorites":{"$in": [ mongoose.Types.ObjectId(req.params.id), "$favorites._id" ]},
                    "comparsion":{"$in": [ mongoose.Types.ObjectId(req.params.id), "$comparsion._id" ]},
                    "basket": {"$filter": {input: "$basket", as: "item",
                            cond: { $eq: [ "$$item.productId", mongoose.Types.ObjectId(req.params.id) ]} }},
                    "listLikeReviews": {"$filter": {input: "$listLikeReviews", as: "item",
                            cond: { $in: [ "$$item._id",
                                    [...product.listReviews.map(review=>
                                        mongoose.Types.ObjectId(review._id.toString()))] ]} }},
                    "listDislikeReviews": {"$filter": {input: "$listDislikeReviews", as: "item",
                            cond: { $in: [ "$$item._id",
                                    [...product.listReviews.map(review=>
                                        mongoose.Types.ObjectId(review._id.toString()))] ]} }} }},
            {"$project":{
                    "basket":{"idSeller":1},
                    "listDislikeReviews":{"_id":1},
                    "listLikeReviews":{"_id":1},
                    "favorites":1, "comparsion":1}} ])
        userNotes = userNotes[0];product.like = userNotes.favorites;product.list = userNotes.comparsion
        product.listSeller.forEach(( seller,key)=>{
            product.listSeller[key].basket = userNotes.basket.some(userProduct=>
                userProduct.idSeller.toString()==seller._id.toString())})
        product.listReviews.forEach(( review,key)=>{
            product.listReviews[key].likeStatus = userNotes.listLikeReviews.some(likeReviews=>
                likeReviews._id.toString()==review._id.toString())
            product.listReviews[key].dislikeStatus = userNotes.listDislikeReviews.some(dislikeReviews=>
                dislikeReviews._id.toString()==review._id.toString())})
        const maxPopularity = Math.max(...product.listSeller.map(seller=> {return seller.popularity}))
        const favoriteProduct = product.listSeller.filter(seller=>seller.popularity==maxPopularity)[0]
        product.basket = {idSeller:favoriteProduct._id,basket:favoriteProduct.basket}}
    product.listReviews.forEach((review,key)=>{
        product.listReviews[key].advantages = review.advantages.split("\r\n")
        product.listReviews[key].limitations = review.limitations.split("\r\n")
        product.listReviews[key].comment = review.comment.split("\r\n")})
    res.render('product',{
        title:`${product.nameProduct}`,
        productPage: true,
        product
    })
})
router.get('/:id/review/:star',async (req,res)=>{
    const product = await Product.findById(req.params.id,
        'nameProduct photoURL colorBackground').lean()
    product.listStars = await Comments.aggregate([
        { "$match": { "product":mongoose.Types.ObjectId(req.params.id)}},
        { "$group": { "_id": "$rating", "numberStarRatings": { "$sum":1}}},
        { "$sort" : { "_id" : -1} }]);
    const filter = req.params.star>0?{product:req.params.id,rating:req.params.star}:{product:req.params.id}
    product.listReviews = await Comments
        .find(filter,"_id author photo rating date like dislike advantages limitations comment")
        .sort({topicality:-1,date:-1})
        .populate('author', '-_id fullName photoUrl verifiedUser').lean()
    product.listReviews.forEach((review,key)=>{
        product.listReviews[key].advantages = review.advantages.split("\r\n")
        product.listReviews[key].limitations = review.limitations.split("\r\n")
        product.listReviews[key].comment = review.comment.split("\r\n")})
    res.render('reviewsProduct',{
        title:"Отзывы",
        productPage: true,
        star:req.params.star,
        product
    })
})
router.get('/:id/comment', async (req, res)=>{
    const product = await Product.findById(req.params.id,'nameProduct photoURL colorBackground price').lean()
    const userReviews = await Comments.findOne({product:req.params.id,author:req.session.user._id},"").lean()
    if(userReviews!==null){
        if(userReviews.rating){product.rating=userReviews.rating}
        if(userReviews.advantages){product.advantages=userReviews.advantages.split("\r\n").join("\r")}
        if(userReviews.limitations){product.limitations=userReviews.limitations.split("\r\n").join("\r")}
        if(userReviews.comment){product.comment=userReviews.comment.split("\r\n").join("\r")}}
    res.render('comment',{
        title:"Отзыв",
        commentPage: true,
        product
    })
})
router.post('/:id/comment', async (req, res) => {
    let {photo,advantages,limitations,comment,rating}= req.body
    const userReviews = await Comments.findOne({product:req.params.id,author:req.session.user._id},"_id").lean()
    if(userReviews!==null){
        await Comments.findByIdAndUpdate(userReviews._id.toString(),{advantages,limitations,comment,rating})
            .exec(err=>{
                if(err){throw err}
                res.redirect(`/catalog/${req.params.id}`)})
    }else{
        const topicality =
            (advantages.length>25?1:0)+
            (limitations.length>25?1:0)+
            (comment.length>250?1:0)
        let userComment = new Comments({
            product:req.params.id.toString(),
            author:req.session.user._id.toString(),
            photo, rating,topicality, advantages, limitations, comment})
        await userComment.save()
        res.redirect(`/catalog/${req.params.id}`)}
})
router.get('/:id/brand',async (req, res)=>{
    const n = Number(req.params.id)
    res.render('brand',{
        title:`${product.name}`,
        brandPage: true,
        userStatus:true,
        account,
        brand:brands[n],
        products,
        brands,
        topics
    })
})
module.exports = router