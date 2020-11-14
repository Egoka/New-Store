const {Router} = require('express')
const router = Router()
router.get('/',(req, res) => {
    res.render('start', {
        title: 'Стартовая страница',
        selection,
        topics,
        brands
    })
})
module.exports = router