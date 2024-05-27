const express = require('express');
const router = express.Router();
const URL = require('../model/url');

router.get('/', async(req, res) => {
    const AllUrls = await URL.find({});


    res.render('index',{urls:AllUrls});
});

module.exports=router;