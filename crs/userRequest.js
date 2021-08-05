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
module.exports = router