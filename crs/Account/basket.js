const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Users = require('../../modelsDB/users')
router.get('/',async (req, res) => {
    const{basketList, sumPrise, sizeBasket} = await getAllProductsFromBusket(req.session.user._id)
    res.render('basket', {
        title: 'Корзина',
        basket:true,
        basketList,
        sumPrise,sizeBasket
    })
})
module.exports = router