const {Router} = require('express')
const Users = require('../../modelsDB/users')
const router = Router()
router.get('/login',(req, res) => {
    const password = req.flash('password')
    res.render('authorization', {
        title: 'Авторизация',
        authorization:true,
        login:true,
        email:req.flash('email'),
        emailStatus:(req.flash('email')&&(!password)),
        password:password,
        error:req.flash('error'),
        resetPassword:req.flash('resetPassword'),
    })
})
router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/authorization/login')
    })
})
router.post('/login',async (req, res) => {
    const {email,password} = req.body
    req.session.user = await Users.findOne({email},
        'fullName photoUrl email password theme verifiedUser').lean()
    req.session.isAuthorization = true
    req.session.save(err=>{
        if(err){throw err}
        res.redirect('/')
    })
})
router.get('/registration',(req, res) => {
    res.render('authorization', {
        title: 'Регистрация',
        authorization:true,
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
        authorization:true,
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