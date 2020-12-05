const {Router} = require('express')
const router = Router()
const {filter, products, product, brands, recall} = require('./inf/filter.js')
router.get('/',(req, res) => {
    const user = true
    res.render('catalog', {
        title: 'Стартовая страница',
        catalog: true,
        user,
        products,
        filters:filter
    })
})
router.get('/:id', async (req, res)=>{
    res.render('product.hbs',{
        title:`${product.name}`,
        userStatus:true,
        product,
        brands,
        recall
    })
})
module.exports = router