const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Users = require('../../modelsDB/users')
const closedPage = require('../../middleware/auth')
async function getAllProductsFromBusket(userID) {
    const products = await Users.aggregate([
        { "$match": { "_id": mongoose.Types.ObjectId(userID) } },
        {"$project": {"basket": 1,"_id":0}},
        { "$lookup": {
                from: "products",
                let: { productId: "$basket.productId", isSeller:"$basket.idSeller" },
                pipeline: [
                    { "$match": { $expr: { $in: [ "$_id",  "$$productId"] }}},
                    { "$project": {
                            "nameProduct": 1,
                            "listSeller": {
                                "$filter": {input: "$listSeller", as: "item",
                                    cond: { $in: [ "$$item._id", "$$isSeller"] }}},
                            "_id": 1 } },
                    { "$lookup": {
                            from: "sellers",
                            let: { idSeller: "$listSeller.idSeller" },
                            pipeline: [
                                { "$match": { $expr: { $in: ["$_id", "$$idSeller"] }}},
                                { "$project":{fullName:1,_id:1}}
                            ], as: "idSeller"}},
                ], as: "products" }},
        { "$project": {
                'basket': {_id:1,count:1, idSeller:1},
                'products':{_id:1,nameProduct:1,
                    listSeller:{_id:1, idSeller:1, price:1},
                    idSeller:1}
            }}])
    let sumPrise=0;let sizeBasket=0
    const basket = products[0].basket;const basketList = products[0].products
    basketList.forEach(object=>{
        const listNameSellers = object.idSeller
        object.listSeller.forEach(product=> {
            const productInBasket = basket.find(seller =>
                seller.idSeller.toString() === product._id.toString())
            product._id = productInBasket._id.toString()
            product.count = productInBasket.count
            product.nameSeller = listNameSellers.find(nameSeller =>
                nameSeller._id.toString()===product.idSeller.toString()).fullName
            sumPrise+=product.price*product.count
            sizeBasket+=product.count
            delete product.idSeller})
        delete object.idSeller})
    return {basketList,sumPrise,sizeBasket}}
router.get('/', closedPage, async (req, res) => {
    const{basketList, sumPrise, sizeBasket} = await getAllProductsFromBusket(req.session.user._id)
    res.render('basket', {
        title: 'Корзина',
        basket:true,
        basketList,
        sumPrise,sizeBasket
    })
})
router.get('/pay', closedPage, async(req,res)=>{
    const{basketList} =await getAllProductsFromBusket(req.session.user._id)
    basketList.forEach((product,indexProduct)=>{
        delete basketList[indexProduct]._id
        product.listSeller.forEach((_,indexSeller)=> {
            delete basketList[indexProduct].listSeller[indexSeller]._id})})
    await Users.findByIdAndUpdate(req.session.user._id,
        {$push:{orders:{order:basketList}}})
        .exec(async err => {
            if(err){throw err}
            await Users.findByIdAndUpdate(req.session.user._id,{$set: {"basket": []}})
            res.redirect('/account/')
        })
})
module.exports = router