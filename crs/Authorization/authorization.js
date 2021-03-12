const {Router} = require('express')
const router = Router()
router.get('/login',(req, res) => {
    const password = req.flash('password')
    res.render('authorization', {
        title: 'Авторизация',
        login:true,
        email:req.flash('email'),
        emailStatus:(req.flash('email')&&(!password)),
        password:password,
        error:req.flash('error'),
        resetPassword:req.flash('resetPassword'),
    })
})
router.post('/login',(req, res) => {
    req.flash('email', req.body.login)
    // req.flash('error', 'не верный логин')
    req.flash('error', 'не верный пароль')
    req.flash('password', req.body.password)
    req.flash('resetPassword',true)
    // req.flash('error', 'подтвердите аккаун в письме')
    res.redirect('/authorization/login')
})
router.get('/registration',(req, res) => {
    res.render('authorization', {
        title: 'Регистрация',
        registration:true,
        name:req.flash('name'),
        email:req.flash('email'),
        registrationPassword:req.flash('registrationPassword'),
        registrationPasswordDup:req.flash('registrationPasswordDup'),
        error:req.flash('error'),
        typeError:req.flash('typeError')
    })
})
router.post('/registration',(req,res)=>{
    req.flash('name', req.body.name)
    req.flash('email', req.body.email)
    req.flash('registrationPassword', req.body.registrationPassword)
    req.flash('registrationPasswordDup', req.body.registrationPasswordDup)
    req.flash('error', 'такой логин уже существует')
    // req.flash('error', 'эта почта уже зарегестрирована')
    // req.flash('error', 'пароли не совпадают')
    req.flash('typeError', 1)
    res.redirect('/authorization/registration')
})
router.get('/resetAccount',(req, res) => {
    res.render('authorization',{
        title: 'Восстановление пароля',
        resetAccount:true,
        email:req.flash('email'),
        error:req.flash('error')
    })
})
router.post('/resetAccount',(req,res)=>{
    req.flash('error', 'не существующий email')
    req.flash('email', req.body.email)
    res.redirect('/authorization/resetAccount')
})
module.exports = router