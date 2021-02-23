const {Router} = require('express')
const router = Router()
const {basket,account} = require('./inf/filter.js')
router.get('/',(req, res) => {
    const sumPrise = 150000
    const sizeBasket =10
    res.render('basket', {
        title: 'Стартовая страница',
        basket:true,
        account,
        basketList:basket,
        sumPrise,sizeBasket
    })
})
module.exports = router