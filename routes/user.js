const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const csrf = require('../middleware/csrf');

const locals = require('../middleware/locals');

router.get('/', locals ,userController.getHome);

router.get('/register', csrf ,locals ,userController.getRegister);
router.post('/new-register', csrf ,locals ,userController.postRegister);

router.get('/login', csrf ,locals ,userController.getLogin);
router.post('/login', csrf ,locals ,userController.postLogin);
module.exports = router;