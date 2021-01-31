const {Router} = require('express')
const router = Router()
const {products, productTypes} = require('./inf/filter.js')
router.get('/',(req, res) => {
    res.render('comparison', {
        title: 'Сравнения',
        comparison: true,
        products,
        options:productTypes
    })
})
module.exports = router