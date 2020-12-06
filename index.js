const express = require('express')
const exps = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session')
/////////////////////////////////////////////////
const start = require('./crs/start')
const catalog = require('./crs/catalog')
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
app.use('/', start)
app.use('/catalog', catalog)
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
