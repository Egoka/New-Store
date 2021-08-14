const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Product = require('../modelsDB/product')
const Users = require('../modelsDB/users')
const Comments = require('../modelsDB/comments')
const Description = require('../modelsDB/description')
const closedPage = require('../middleware/auth')
require('../modelsDB/seller')
async function filterProduct(filter, prohibitedOption,isAuthorization, userId, typeId, sort){
    let allSelectedOption = filter
        .reduce((result, object)=> result.concat(object.listId),[])
        .map(id=>mongoose.Types.ObjectId(id))
    let fetchFromSelectedOrder,selectionOfPropertiesByCondition
    if(filter.length===0){
        fetchFromSelectedOrder = {$match: { _id : {$ne: ""} }}
        selectionOfPropertiesByCondition = {$match: { _id : {$ne: ""} }}
    }else{
        fetchFromSelectedOrder = { $match: {option:{ $in: [...allSelectedOption] }}}
        selectionOfPropertiesByCondition = { $match: { $and:[...filter.map(type=> {
                    return {$or: [...type.listId.map(id => {
                            return{"listOptions.option":{$eq:mongoose.Types.ObjectId(id)}}})]}
                })]}} }
    console.time('100-elements')
    let products = await Description.aggregate([
        {$match: { type: {$eq: mongoose.Types.ObjectId(typeId)} } },
        fetchFromSelectedOrder,
        { $group: { _id: "$product",
                listOptions:{$push: {
                        option:"$option"}}}},
        selectionOfPropertiesByCondition,
        {$project:{_id:1}},
        { $lookup: {
                from: "products",
                let: { id: "$_id" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
                    { $project:{_id:1,nameProduct:1,photoURL:1,
                            colorBackground:1,stars:1,rating:1,
                            date:1,price:1,depiction:1}}
                ], as: "_id"}},
        { $sort : sort },
        {$project:{_id:{$first:"$_id._id"},
                colorBackground:{$first:"$_id.colorBackground"},
                nameProduct:{$first:"$_id.nameProduct"},
                photoURL:{$first:"$_id.photoURL"},
                stars:{$first:"$_id.stars"},
                date:{$first:"$_id.date"},
                price:{$first:"$_id.price"},
                depiction:{$first:"$_id.depiction"},
                listOptions:1}},
        { $addFields: {
            daysCount: { $cond: [
                { $lte: [
                    {$round: {$divide: [
                        {$subtract: [ new Date(), "$date"]}, 86400000] }},
                        30 ] }, true, false ] } } }])//30 days
    let validOption
    if(products.length>0) {
        validOption = await Description.aggregate([
            {$match: {product: {$in: [...products.map(product =>
                            mongoose.Types.ObjectId(product._id))]}}},
            {$group: {_id: "$option"}},
            {$lookup: {from: "options", localField: "_id", foreignField: "_id", as: "_id"}},
            {$match: {"_id.important": {$eq: true}}},
            {$project: {_id: {$first: "$_id._id"}}}])
        validOption = validOption.map(id=>mongoose.Types.ObjectId(id._id))
    }else{validOption = allSelectedOption}
    const filters = await Description.aggregate([
        {$match: { type : {$eq: mongoose.Types.ObjectId(typeId)} } },
        { $group: { _id: "$option"}},
        { $lookup: {from: "options", localField: "_id", foreignField: "_id", as: "_id"}},
        { $project:{
                _id: { $first: "$_id._id" },
                type:{ $first: "$_id.type" },
                name:{ $first: "$_id.name" },
                priority:{ $first: "$_id.priority" },
                value:{ $first: "$_id.value" },
                important:{ $first: "$_id.important" } }},
        { $match: {important:{ $eq:true}}},
        { $addFields: { state: {$cond:
                        [{ $in: [ "$_id", [...allSelectedOption]]}, 1, 0]} }},
        { $addFields: { state: {$cond:
                        [{ $in: [ "$_id", [...validOption]]}, "$state", -1]} }},
        { $sort : {"_id":1 } },
        { $group: { _id : "$name",
                type:{$first:"$type"},
                priority:{$first:"$priority"},
                options:{$push: {_id:"$_id", value: "$value", state:"$state"}} }},
        { $sort : { "type":1,"priority":1 } },
        { $project: {_id: 1,options:1}}
    ])
    if(filter.length!==0){
        if(prohibitedOption.length>0) {
            const filterId = filters
                .map(description => description.options
                    .filter(oprion => oprion.state === -1))
                .filter(object => object.length > 0)
                .reduce((result, object) => result.concat(object), [])
                .map(object => object._id.toString())
            prohibitedOption = prohibitedOption.filter(idProhibit =>
                filterId.findIndex(id => id === idProhibit) >= 0)}
        filters.map(description =>{
            if(description.options.findIndex(option=>option.state===1)>=0){
                return description.options.map(option=> {
                    if(option.state === -1) {
                        if(prohibitedOption.length===0||
                            prohibitedOption.findIndex(id=>
                                option._id.toString()===id.toString())===-1){
                            return option.state = 0
                        }}}
                )}
        })}
    console.timeEnd('100-elements')
    if(isAuthorization) {
        const user = await Users.findById(userId, 'favorites comparsion').lean()
        if(user.favorites.length>0) {
            products.map(async (product,kay)=>{
                products[kay].like = user.favorites.filter(likeProduct =>
                    likeProduct._id.toString() === product._id.toString()).length>0})}
        if(user.comparsion.length>0) {
            products.map(async (product,kay)=>{
                products[kay].list = user.comparsion.filter(listProduct =>
                    listProduct._id.toString() === product._id.toString()).length>0})}}
    return{products,filters,prohibitedOption} }
router.get('/',async (req, res) => {
    if(!req.session.filter){req.session.filter=Array()}
    if(!req.session.prohibitedOption){req.session.prohibitedOption=Array()}
    if(!req.session.sortCatalog){req.session.sortCatalog={"_id.rating":-1 }}
    let userId; if(req.session.isAuthorization) { userId = req.session.user._id }else{ userId = "" }
    const typeId = "607c1ab83de7e20a834ff0f6"/*TODO временная перменная*/
    const {products, filters} = await filterProduct(req.session.filter, req.session.prohibitedOption,
        req.session.isAuthorization, userId, typeId, req.session.sortCatalog)
    res.render('catalog', {
        title: 'Каталог',
        catalog:true,
        catalogPage: true,
        products,
        filters,
        sort:Object.keys(req.session.sortCatalog)[0].split('.')[1]
            +Object.values(req.session.sortCatalog)[0]
    })
})
router.post('/filters', async (req, res)=>{
    if(req.body.option){
        const index = req.session.filter.findIndex(index=>index.type===req.body.option)
        if(index>=0){
            const indexVal = req.session.filter[index].listId.findIndex(index=>index===req.body.id)
            if(indexVal>=0){
                req.session.filter[index].listId.splice(indexVal, 1)
                if(req.session.filter[index].listId.length===0){
                    req.session.filter.splice(index, 1)}
            }else{req.session.filter[index].listId.splice(index, 0, req.body.id)}
        }else{req.session.filter.splice(index, 0, {type:req.body.option,listId:Array(req.body.id)})}
        if(req.session.filter.length==1){req.session.prohibitedOption = Array()}
        if(req.body.prohibitedOption.length>0){
            req.body.prohibitedOption.map(option=> {
                const prohibitIndex = req.session.prohibitedOption.findIndex(index => index === option.id)
                if (option.status===true&&prohibitIndex == -1) {
                    req.session.prohibitedOption.splice(prohibitIndex, 0, option.id)}
                if(option.status===false){
                    req.session.prohibitedOption.splice(prohibitIndex, -1)}
            }) }}
    if(req.body.sort){
        switch (+req.body.sort) {
            case 1:req.session.sortCatalog={"_id.rating":-1 };break;
            case 2:req.session.sortCatalog={"_id.date":-1 };break;
            case 3:req.session.sortCatalog={"_id.price":1 };break;
            case 4:req.session.sortCatalog={"_id.price":-1 };break; }}
    let userId; if(req.session.isAuthorization) { userId = req.session.user._id }else{ userId = "" }
    const typeId = "607c1ab83de7e20a834ff0f6"/*TODO временная перменная*/
    const {products, filters,prohibitedOption} = await filterProduct(
        req.session.filter, req.session.prohibitedOption,
        req.session.isAuthorization, userId, typeId,
        req.session.sortCatalog)
    req.session.prohibitedOption = prohibitedOption
    res.json({products,filters,
        isAuth: req.session.isAuthorization,
        sort:Object.keys(req.session.sortCatalog)[0].split('.')[1]
            +Object.values(req.session.sortCatalog)[0]
    }) })
router.get('/:id', async (req, res)=>{
    const product = await Product
        .findById(req.params.id)
        .populate('listSeller.idSeller','_id photoUrl recallStar').lean()
    const result = [...await Description.aggregate([
        {"$match": {"product":mongoose.Types.ObjectId(req.params.id)}},
        {"$lookup": {
            from: "options", localField: "option", foreignField: "_id", as: "option"}},
        {"$unwind": {path: "$option", preserveNullAndEmptyArrays: true}},
        {"$sort": { "option.priority":1 } },
        {"$group": {"_id": {"product": "$product", "type": "$option.type"},
                "option":{$push: {name:"$option.name", priority: "$option.priority", value:"$option.value"}},
                "type":{$first:"$option.type"} }},
        {"$sort": { "type" : 1,"option.priority":1 } },
        {"$lookup": {
            from: "typedescriptions", localField: "type", foreignField: "_id", as: "type",}},
        {"$group": {"_id" : "$_id.product",
                "description":{$push: {"type":"$type", "option": "$option"}} }},
        {"$project": {
            "_id":0, "description":{
                "type": {"typeName":1}, "option":{"name":1, "value":1}}}} ])][0]
    product.description =result?result.description:0
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
        product.basket = {idSeller:favoriteProduct._id,basket:favoriteProduct.basket}
        const user = await Users.findById(req.session.user._id,
            {viewedProducts: {$elemMatch: {_id: req.params.id}}}).lean()
        if(!user.viewedProducts){
            await Users.findByIdAndUpdate(req.session.user._id,
                {$push: {viewedProducts: {_id:req.params.id}}})
            await Product.findByIdAndUpdate(req.params.id,
                {$inc: { rating: 1 }})
        }
    }
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
router.get('/:id/comment', closedPage,async (req, res)=>{
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
router.post('/:id/comment', closedPage, async (req, res) => {
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