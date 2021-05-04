module.exports = (req,res,next) => {
    res.locals.isAuth = req.session.isAuth ? req.session.isAuth : false;
    res.locals.admin_Name = req.session.user ? req.session.user.name : false;
    res.locals.admin_Mail = req.session.user ? req.session.user.email : false;
    next();
}