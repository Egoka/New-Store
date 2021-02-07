const {Router} = require('express')
const router = Router()
const {recall} = require('./inf/filter.js')
router.get('/',(req, res) => {
    res.render('reviews', {
        title: 'Стартовая страница',
        reviews: true,
        recall
    })
})
module.exports = router