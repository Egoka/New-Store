const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Product = require('../modelsDB/product')
const {filter, products, product, brands, recall,topics, account} = require('./inf/filter.js')
router.get('/',(req, res) => {
    const user = true
    res.render('catalog', {
        title: 'Каталог',
        catalog:true,
        catalogPage: true,
        account,
        user,
        products,
        filters:filter
    })
})
router.get('/:id', async (req, res)=>{
    const product = await Product
        .findById(req.params.id)
        .populate('listSeller.idSeller','_id photoUrl recallStar').lean()
    res.render('product',{
        title:`${product.nameProduct}`,
        productPage: true,
        product
    })
})
router.get('/:id/comment', async (req, res)=>{
    const id = Number(req.params.id)
    res.render('comment',{
        title:"Отзыв",
        commentPage: true,
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
    res.render('brand',{
        title:`${product.name}`,
        brandPage: true,
        userStatus:true,
        account,
        brand:brands[n],
        products,
        brands,
        topics
    })
})
module.exports = router