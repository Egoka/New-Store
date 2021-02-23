const {Router} = require('express')
const router = Router()
const {products, productTypes, account} = require('./inf/filter.js')
router.get('/',(req, res) => {
    res.render('favorites', {
        title: 'Избранное',
        favorites: true,
        account,
        products,
        options:productTypes
    })
})
module.exports = router