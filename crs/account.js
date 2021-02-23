const {Router} = require('express')
const router = Router()
const {account, orders} = require('./inf/filter.js')
router.get('/',(req, res) => {
    res.render('account', {
        title: 'Стартовая страница',
        privateOffice:true,
        account,
        orders
    })
})
module.exports = router