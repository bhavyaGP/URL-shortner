const express = require('express');
const router = express.Router();
const URL = require('../model/url');

router.get('/', async (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const AllUrls = await URL.find({ createdby: req.user._id});
    res.render('index', { urls: AllUrls });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});
module.exports = router;