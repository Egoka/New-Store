const {Router} = require('express')
const bcrypt = require('bcryptjs')
const Users = require('../../modelsDB/users')
const router = Router()
const closedPage = require('../../middleware/auth')
const nodemailer = require('nodemailer')
const {mailKey,emailFrom:user,emailPassword:pass} = require('../../keys/private')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {user, pass} })
const regEmail = require('../../email/registrationEmail')
const resetPas = require('../../email/resetPassword')
router.get('/login',(req, res) => {
    if(req.session.isAuthorization){res.redirect(req.session.lastURL)}
    if(!req.session.lastURL){req.session.lastURL = '/'}
    res.render('authorization', {
        link:'/',
        title: 'Авторизация',
        authorization:true,
        login:true,
        email:req.flash('email'),
        emailStatus:req.flash('emailStatus'),
        password:req.flash('password'),
        resetPassword:req.flash('resetPassword'),
        error:req.flash('error')
    })
})
router.get('/logout', closedPage, (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/authorization/login')
    })
})
router.post('/login',async (req, res) => {
    const {email,password} = req.body
    let candidate = await Users.findOne({email},
        'fullName photoUrl email password theme verifiedUser').lean()
    if(candidate){
        if(await bcrypt.compare(password,candidate.password)){
            req.session.user = candidate
            req.session.isAuthorization = true
            req.session.save(err=>{
                if(err){throw err}
                res.redirect(req.session.lastURL)})
        }else{
            req.flash('email', email)
            req.flash('password', password)
            req.flash('resetPassword',true)
            req.flash('error', 'Неверный пароль')
            res.redirect('/authorization/login')}
    }else{
        req.flash('email', email)
        req.flash('emailStatus',true)
        req.flash('password', password)
        req.flash('error', 'Неверный email')
        res.redirect('/authorization/login')}
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
router.post('/registration',async (req,res)=>{
    let {name, email, registrationPassword:password,
        registrationPasswordDup:passwordDup} = req.body
    function flashMessage(messege,typeError) {
        req.flash('name', name)
        req.flash('email', email)
        req.flash('registrationPassword', password)
        req.flash('registrationPasswordDup', passwordDup)
        req.flash('error', messege)
        req.flash('typeError',typeError)
        return res.redirect('/authorization/registration')}
    if (await Users.findOne({email})){
        req.flash('email',email)
        req.flash('registerEmailError', 'Вы уже зарегестрированы')
        return res.redirect('/authorization/reset')
    }else{
        if (password !== passwordDup){
            return flashMessage('Пароль не совпадает', 4)
        }else{
            if(/([0-9])/.test(password)){
                if(/([A-Za-zА-Яа-я])/.test(password)){
                    let frequencyValidation = Array.from(password)
                    if(frequencyValidation.length>6&&frequencyValidation.length<20){
                        frequencyValidation = Object.entries(
                            frequencyValidation.reduce((acc, el) =>
                            {acc[el] = (acc[el] || 0) + 1; return acc;}, {}))
                        if(frequencyValidation.length>4){
                            frequencyValidation = frequencyValidation.filter(symbol =>symbol[1]>8)
                            if(frequencyValidation.length==0){
                                let randStr = function(){return Math.random().toString(36).substr(2)}
                                const token = randStr()+randStr()
                                const user = new Users({
                                    fullName:name, email,
                                    verifiedToken:token,
                                    password:await bcrypt.hash(password,10)})
                                await user.save()
                                req.flash('email',email)
                                req.flash('password', password)
                                res.redirect('/authorization/login')
                                await transporter.sendMail(regEmail(name, email, token))
                            }else{return flashMessage("Пароль должен быть сложнее",3)}
                        }else{return flashMessage("Пароль должен быть сложнее",3)}
                    }else{return flashMessage("Пароль должен быть длиннее, от 6 до 20 знапков",3)}
                }else{return flashMessage("Пароль дожен состоять из букв",3)}
            }else{return flashMessage("Пароль дожен состоять из цифр",3)}
        }}
})
router.get('/resetAccount',(req, res) => {
    let email = req.flash('email')
    if(req.query){email=req.query.email}
    res.render('authorization',{
        title: 'Восстановление пароля',
        authorization:true,
        resetAccount:true,
        email,
        error:req.flash('error')
    })
})
router.post('/resetAccount',async (req,res)=>{
    const candidate = await Users.findOne({email:req.body.email}, "fullName email")
    if (candidate){
        let randStr = function(){return Math.random().toString(36).substr(2)}
        const token = randStr()+randStr()
        candidate.resetToken = token
        candidate.resetDate = new Date(+new Date().setHours(new Date().getHours()+3))
        await candidate.save()
        await transporter.sendMail(resetPas(candidate.fullName,candidate.email,token))
        res.redirect('/authorization/login')
    }else{
        req.flash('error', 'Такого email нет. Зарегестрируйтесь.')
        req.flash('email', req.body.email)
        res.redirect('/authorization/resetAccount')}
})
router.get('/password/:token',async(req,res) =>{
    if(!req.params.token) res.redirect('/entry/login')
    const user = await Users.findOne({
        resetToken: req.params.token,
        resetDate: {$gt:Date.now()}})
    if(!user) {
        req.flash('registerEmailError', 'Время действия ссылки истекло')
        res.redirect('/authorization/resetAccount')
    }else{
        res.render('authorization',{
            title: 'Восстановить доступ',
            authorization:true,
            newPassword:true,
            error: req.flash('error'),
            userId: user._id.toString(),
            token: req.params.token,
            email:user.email,
            registrationPassword:req.flash('registrationPassword'),
            registrationPasswordDup:req.flash('registrationPasswordDup')
        })}
})
})
module.exports = router