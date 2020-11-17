const {Router} = require('express')
const router = Router()
const {filter, products} = require('./inf/filter.js')
router.get('/',(req, res) => {
    console.log(products)
    const user = true
    res.render('catalog', {
        title: 'Стартовая страница',
        catalog: true,
        user,
        products,
        filters:filter
    })
})
module.exports = router