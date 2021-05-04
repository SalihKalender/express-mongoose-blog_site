const User = require('../models/user');
const post = require('../models/post');
const bcrypt = require('bcrypt');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getHome = async (req,res,next) => {
    const posts = await post.find({}).populate('user_id','user_name -_id').sort({'date':-1});
    res.render('user/Home',{
        posts: posts
    });
}

exports.getRegister = (req,res,next) => {
    res.render('user/register',{
        action: req.query.action
    });
}

exports.postRegister = async (req,res,next) => {
    const data = req.body;
    const isMail = await User.findOne({email: data.email});
    if(!isMail) {
        const isUser_name = await User.findOne({user_name: data.user_name});
        if(!isUser_name) {
            const hashed_password = await bcrypt.hash(data.password,10);
            const newUser = new User({
                name: data.name,
                user_name: data.user_name,
                password: hashed_password,
                email: data.email,
                post: {
                    items: []
                }
            });
            await newUser.save();
            const msg = {
                to: data.email,
                from: 'm.salihk72@gmail.com', // Use the email address or domain you verified above
                subject: 'Yeni Kullanıcı',
                html: `
                <strong>Merhaba ${data.name}, Seni Aramızda Görmek ne Güzel :)</strong>
                <p>Bu Arada Şifreni Sadece Sen Biliyorsun, Uçtan Uca Şifreleme Yöntemi İle Korunuyor</p>
                `,
            };
            await sgMail.send(msg)
            res.redirect('/login?action=newuser');
        }
        else {
            res.redirect('/register?action=uservar');
        }
    }
    else {
        res.redirect('/register?action=mailvar');
    }
}

exports.getLogin = async (req,res,next) => {
    res.render('user/login',{
        action: req.query.action
    });
}

exports.postLogin = async (req,res,next) => {
    const data = req.body;
    const user = await User.findOne({user_name: data.user_name});
    if(user) {
        const is_Success = bcrypt.compare(data.password,user.password);
        if(is_Success) {
            req.session.isAuth = true;
            req.session.user = user;
            console.log(req.session);
            if(req.session.redirectTo) {
                return req.session.save(() => {
                    res.redirect(req.session.redirectTo);
                })
            }
            else {
                req.session.save(() => {
                    res.redirect('/');
                })
            }
        }
        else {
            res.redirect('/login?action=passworderror');
        }
    }
    else {
        res.redirect('/login?action=username_error');
    }
}