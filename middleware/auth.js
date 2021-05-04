module.exports = (req,res,next) => {
    if(!req.session.isAuth) {
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    }
    else {
        next();
    }
}