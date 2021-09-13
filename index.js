const express = require('express')
const exps = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const MongoSession =  require('connect-mongodb-session')(session)
/////////////////////////////////////////////////
const {urlMongoDB:URL,sessionKey} = require('./keys/private')
const varMiddleware = require('./utils/variables')
/////////////////////////////////////////////////
const start = require('./crs/start')
const authorization = require('./crs/Authorization/authorization')
const catalog = require('./crs/catalog')
const favorites = require('./crs/Account/favorites')
const compare = require('./crs/Account/compare')
const reviews = require('./crs/Account/reviews')
const basket = require('./crs/Account/basket')
const account = require('./crs/Account/account')
const request = require('./crs/userRequest')
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
const storeSession = new MongoSession({
    collation:'sessions',
    uri: URL })
app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
    storeSession}));
app.use(varMiddleware)
// /////////////////////////////////////////////////
app.use('/', start)
app.use('/authorization', authorization)
app.use('/catalog', catalog)
app.use('/favorites', favorites)
app.use('/compare', compare)
app.use('/reviews', reviews)
app.use('/basket', basket)
app.use('/account', account)
app.use('/request', request)
/////////////////////////////////////////////////
const PORT = process.env.PORT || 3000
async function startProgram(){
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(err){console.log(err)}
}
startProgram()
