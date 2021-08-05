const {Router} = require('express')
const mongoose = require('mongoose')
const router = Router()
const Users = require('../../modelsDB/users')
const Description = require('../../modelsDB/description')
router.get('/:id',async (req, res) => {
    res.render('compare', {
        title: 'Сравнения',
        compare: true,
        products,
        options
    })
})
module.exports = router