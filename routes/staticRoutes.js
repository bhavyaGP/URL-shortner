const express = require('express');
const router = express.Router();
const URL = require('../model/url');

router.get('/', async (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    const AllUrls = await URL.find({ createdby: req.user._id });
    //also send req.url to get the host and protocol
    res.render('index', { urls: AllUrls, protocol: req.protocol, host: req.get('host') });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/login');
});

module.exports = router;