const {emailFrom,appURL} = require('../keys/private')
module.exports = function(name, email,token){
    const RESET_URL = `${appURL}/authorization/password/${token}`
    return {
        to: email,
        from:emailFrom,
        subject:'Восстановление аккаунта',
        html:`
        <h1>Здравствуйте ${name}.</h1>
        <p>Это письмо пришло вам, потому что на сайте магазина было запрошено восстановление пароля по этой почте ${email}.</p>
        <p>Если это сделали не вы, то можете проигнорировать это письмо.</p>
        <p>Если же восстановление пароля сделано вами, то перейдите по этой <a href="${RESET_URL}">ссылке</a>.</p>
        <a href="${RESET_URL}">Восстановить</a>
        <hr/>
        <a href="${appURL}">В магазин</a>
        `
    }
}