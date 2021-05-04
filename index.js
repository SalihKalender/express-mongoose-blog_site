const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

require('dotenv').config();
const db = require('./db');
const port = process.env.PORT || 8080;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const csurf = require('csurf');

const user_ware = require('./middleware/user_ware');

const store = new MongoDBStore({
    uri: process.env.db_URI,
    collection: 'mySessions'
});

app.use(cookieParser());
app.use(session({
    secret: process.env.Session_SECRET || 'keyboard dog',     //* Gloal projelerde burayı tabikide degistir, session'un sifresi gibi dusun
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 6  //* 6 saat
    },
    store: store
}));
app.use(csurf());

const user_Routes = require('./routes/user');
const admin_Routes = require('./routes/admin');
const error_Routes = require('./routes/error');    //* DİREK COTROLLER'ADA ATSAN OLUYOR

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));

app.use(user_ware);

app.use('/admin',admin_Routes);
app.use(user_Routes);
app.get('*',error_Routes);

app.listen(port,() => {
    console.log(`Server Listening on ${port} port...`);
})

