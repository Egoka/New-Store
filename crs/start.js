const {Router} = require('express')
const router = Router()
const {selection, topics, brands,account} = require('./inf/filter.js')
router.get('/',(req, res) => {
    res.render('start', {
        link:'/',
        title: 'New market',
        start:true,
        account,
        selection,
        topics,
        brands
    })
})
module.exports = router