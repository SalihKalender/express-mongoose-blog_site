const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');
const is_Auth = require('../middleware/auth');
const locals = require('../middleware/locals');
const csrf = require('../middleware/csrf');

router.get('/:name/posts', csrf ,is_Auth , locals ,adminController.getPosts);
router.post('/:name/edit-product', csrf ,is_Auth , locals ,adminController.getEdit_Post);
router.get('/add-post', csrf ,is_Auth , locals ,adminController.addPost);
router.post('/add-post', csrf ,is_Auth , locals ,adminController.Posting);
router.post('/edit-post', csrf ,is_Auth , locals ,adminController.postEdit_Post);
router.get('/logout', csrf ,is_Auth,locals,adminController.logOut)
module.exports = router;

