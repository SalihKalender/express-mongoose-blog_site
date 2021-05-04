const User = require('../models/user');
module.exports = async (req,res,next) => {
    if(!req.session.user) {
        return next();
    }
    else {
        const activeUser = await User.findById(req.session.user._id);
        req.session.user = activeUser;
        next();
    }
}