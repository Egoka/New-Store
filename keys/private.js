if(process.env.NODE_ENV === 'production'){
    module.exports = require('./privateProd')
}else{
    module.exports = require('./privateDev')}