const {emailFrom,appURL} = require('../keys/private')
module.exports = function (name, email, token) {
    const RESET_URL = `${appURL}/entry/login/${token}`
    return {
        to: email,
        from:emailFrom,
        subject:'Аккаунт создан',
        html:`
<div class="backgroundWindow"></div>
<div style="width: 15rem;
        height: max-content;
        margin: 0 auto;
        background-color: #f00;
        border-radius: 1rem;
        padding: 1rem;
        text-align: center;">
    <h3>${name} добро пожаловать в магазин</h3>
    <p>Вы успешно зарегистрированы в магазине</p>
    <p>Перейдите по ссылке, чтобы подтвердить аккаунт</p>
    <a href="${RESET_URL}">Подтвердить</a>
</div>`
    }
}