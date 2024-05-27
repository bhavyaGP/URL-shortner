const express = require('express');
const router = express.Router();
const {generateNewURL,handleGetAnalytics}=require('../controllers/url');


router.post('/', generateNewURL);
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports=router;