const {Router} = require('express')
const router = Router()
const {filter, products, product, brands, recall,topics, account} = require('./inf/filter.js')
router.get('/',(req, res) => {
    const user = true
    res.render('catalog', {
        title: 'Стартовая страница',
        catalog: true,
        account,
        user,
        products,
        filters:filter
    })
})
router.get('/:id', async (req, res)=>{
    const id = Number(req.params.id)
    res.render('product.hbs',{
        title:`${product.name}`,
        userStatus:true,
        account,
        product:products[id],
        brands,
        recall
    })
})
router.get('/:id/comment', async (req, res)=>{
    const id = Number(req.params.id)
    res.render('comment.hbs',{
        title:`${product.name}`,
        userStatus:true,
        account,
        product:products[id]
    })
})
router.post('/:id/comment', async (req, res) => {
    const id = req.params.id
    const {inputAdvantages,inputDisadvantages,textComment,stars}= req.body
    console.log(stars)
    res.redirect(`/catalog/${id}`)
})
router.get('/:id/brand',async (req, res)=>{
    const n = Number(req.params.id)
    res.render('brand.hbs',{
        title:`${product.name}`,
        userStatus:true,
        account,
        brand:brands[n],
        products,
        brands,
        topics
    })
})
module.exports = router