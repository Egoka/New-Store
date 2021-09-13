const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Users = require('../../modelsDB/users')
const closedPage = require('../../middleware/auth')
router.get('/', closedPage, async (req, res) => {
    const account = await Users.findById(req.session.user._id,
        'photoUrl fullName email theme verifiedUser').lean()
    const orders = await Users.aggregate([
        { $match: { "_id": mongoose.Types.ObjectId(req.session.user._id) } },
        { $unwind: '$orders' },
        { $sort: { 'orders.date': -1 }},
        { $group: { _id: '$_id', orders: { $push: '$orders'}}}])
    res.render('account', {
        link:'/account/',
        title: 'Профиль',
        privateOffice:true,
        account,
        orders:orders[0]?orders[0].orders:Array()
    })
})
router.post('/editAccout', closedPage, async (req,res)=>{
    const {photoUrl, fullName} = req.body
    await Users.findByIdAndUpdate(req.session.user._id, {photoUrl, fullName})
    Object.assign(req.session.user, req.body)
    req.session.save()
})
router.post('/editTheme', closedPage, async (req,res)=>{
    await Users.findByIdAndUpdate(req.session.user._id, req.body)
    Object.assign(req.session.user, req.body)
    req.session.save()
})
module.exports = router