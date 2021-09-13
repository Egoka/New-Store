module.exports = function (req,res,next) {
    res.locals.isAuth = req.session.isAuthorization
    if(req.session.isAuthorization){
        res.locals.photoUrl = req.session.user.photoUrl
        res.locals.fullName = req.session.user.fullName
        res.locals.email = req.session.user.email
        res.locals.theme = req.session.user.theme}
    next()
}