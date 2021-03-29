const express = require('express')
const exps = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
/////////////////////////////////////////////////
const start = require('./crs/start')
const authorization = require('./crs/Authorization/authorization')
const catalog = require('./crs/catalog')
const favorites = require('./crs/Account/favorites')
const comparison = require('./crs/Account/comparison')
const reviews = require('./crs/Account/reviews')
const basket = require('./crs/Account/basket')
const account = require('./crs/Account/account')
/////////////////////////////////////////////////
const app = express()
const hbs = exps.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers')
})
/////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
/////////////////////////////////////////////////
app.use(express.static(path.join(__dirname,'static')))
/////////////////////////////////////////////////
app.use(flash())
app.use(session({ cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false}));
// /////////////////////////////////////////////////
app.use('/', start)
app.use('/authorization', authorization)
app.use('/catalog', catalog)
app.use('/favorites', favorites)
app.use('/comparison', comparison)
app.use('/reviews', reviews)
app.use('/basket', basket)
app.use('/account', account)
/////////////////////////////////////////////////
const PORT = process.env.PORT || 3000
async function startProgram(){
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(err){console.log(err)}
}
startProgram()
