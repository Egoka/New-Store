const {Router} = require('express')
const router = Router()
const {recall, account} = require('../inf/filter.js')
router.get('/',(req, res) => {
    res.render('reviews', {
        title: 'Отзывы',
        reviews: true,
        account,
        recall
    })
})
module.exports = router