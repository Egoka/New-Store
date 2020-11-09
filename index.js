const express = require('express')
const exps = require('express-handlebars')
const session = require('express-session')
const path = require('path')
/////////////////////////////////////////////////
const app = express()
const hbs = exps.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
/////////////////////////////////////////////////
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
/////////////////////////////////////////////////
app.use(express.static(path.join(__dirname,'styles')))
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
