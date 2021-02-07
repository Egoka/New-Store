const {Router} = require('express')
const router = Router()
router.get('/',(req, res) => {
    res.render('basket', {
        title: 'Стартовая страница',
        basket:true
    })
})
module.exports = router