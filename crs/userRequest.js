const {Router} = require('express')
const router = Router()
const Users = require('../modelsDB/users')
const Comments = require('../modelsDB/comments')
router.get('/like/:id',async (req, res) => {
    const user = await Users.findById(req.session.user._id,
        {favorites: {$elemMatch: {_id: req.params.id}}}).lean()
    if(user.favorites){
        await Users.findByIdAndUpdate(req.session.user._id,
            {$pull:{favorites: {_id:req.params.id}}})
        res.json(false)
    }else{
        await Users.findByIdAndUpdate(req.session.user._id,
            {$push: {favorites: {_id:req.params.id}}})
        res.json(true)
    }
})
router.get('/list/:id',async (req, res) => {
    const user = await Users.findById(req.session.user._id,
        {comparsion: {$elemMatch: {_id: req.params.id}}}).lean()
    if(user.comparsion){
        await Users.findByIdAndUpdate(req.session.user._id,
            {$pull:{comparsion: {_id:req.params.id}}})
        res.json(false)
    }else{
        await Users.findByIdAndUpdate(req.session.user._id,
            {$push: {comparsion: {_id:req.params.id}}})
        res.json(true)
    }
})
router.get('/replenishBasket/:id/:ids',async (req, res) => {
    const user = await Users.findById(req.session.user._id,
        {basket:{$elemMatch:{productId: req.params.id,idSeller: req.params.ids}}}).lean()
    if(user.basket){
        await Users.findByIdAndUpdate(req.session.user._id,
            {$pull:{basket:{productId:req.params.id,idSeller: req.params.ids}}}).then(res.json(false))
    }else{
        await Users.findByIdAndUpdate(req.session.user._id,
            {$push:{basket:{productId:req.params.id,idSeller: req.params.ids}}}).then(res.json(true))}
})
router.get('/basket/:id/:direction',async (req, res) => {
    if(req.params.direction==0){
        await Users.findByIdAndUpdate(req.session.user._id,
            {$pull:{basket:{_id:req.params.id}}})
            .lean().exec( async (err,user)=>{
                if(err){throw err}
                res.json({count:0,direction:-1})})}
    if(req.params.direction==1){
        await Users.findByIdAndUpdate(req.session.user._id,
            { $inc:{'basket.$[element].count':1}},
            { arrayFilters:[{'element._id':{$eq:req.params.id}}]})
            .lean().exec( async (err,user)=>{
                if(err){throw err}
                res.send({count:user.basket.find(product => product._id.toString() === req.params.id).count+1,direction:1})})}
    if(req.params.direction==-1){
        await Users.findByIdAndUpdate(req.session.user._id,
            { $inc:{'basket.$[element].count':-1}},
            { arrayFilters:[{'element._id':{$eq:req.params.id}}]})
            .lean().exec( async (err,user)=>{
                if(err){throw err}
                const count = user.basket.find(product=> product._id.toString() === req.params.id).count-1
                if(count===0){
                    await Users.findByIdAndUpdate(req.session.user._id,
                        {$pull:{basket:{_id:req.params.id}}})}
                res.json({count,direction:-1})})}
})
router.post('/reviews/',async (req, res) => {
    async function addIdReviewsFromListUser(mode){
        if(mode){await Users.findByIdAndUpdate(req.session.user._id,
            {$push: {listLikeReviews: {_id: req.body.idReviews}}})
        }else{await Users.findByIdAndUpdate(req.session.user._id,
            {$push: {listDislikeReviews: {_id: req.body.idReviews}}})}}
    async function deleteIdReviewsFromListUser(mode){
        if(mode){await Users.findByIdAndUpdate(req.session.user._id,
            {$pull: {listLikeReviews: {_id: req.body.idReviews}}})
        }else{await Users.findByIdAndUpdate(req.session.user._id,
            {$pull: {listDislikeReviews: {_id: req.body.idReviews}}})}}
    async function editReview(value,mode) {
        if(mode==0) {await Comments.findByIdAndUpdate(req.body.idReviews,
            { $inc: {like : value, topicality:value}})}
        if(mode==1) {await Comments.findByIdAndUpdate(req.body.idReviews,
            { $inc: {dislike : value, topicality:value}})}}
    const user = await Users.findById(req.session.user._id, {
        listLikeReviews: {$elemMatch: {_id: req.body.idReviews}},
        listDislikeReviews: {$elemMatch: {_id: req.body.idReviews}}}).lean()
    if(req.body.mode==0){
        if (user.listDislikeReviews) {
            await deleteIdReviewsFromListUser(false)
            await editReview(-1,1)}
        if (user.listLikeReviews) {
            await deleteIdReviewsFromListUser(true)
            await editReview(-1,0)
            res.json(false)
        } else {
            await addIdReviewsFromListUser(true)
            await editReview(1,0)
            res.json(true)}}
    if(req.body.mode==1){
        if (user.listLikeReviews) {
            await deleteIdReviewsFromListUser(true)
            await editReview(-1,0)}
        if (user.listDislikeReviews) {
            await deleteIdReviewsFromListUser(false)
            await editReview(-1,1)
            res.json(false)
        } else {
            await addIdReviewsFromListUser(false)
            await editReview(1,1)
            res.json(true)}}
})
module.exports = router