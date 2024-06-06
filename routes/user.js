const express = require('express');
const router = express.Router();
const User = require('../model/user');
const { HandleUserSignSignUP, HandleUserLogin } = require('../controllers/user');

router.post('/', HandleUserSignSignUP)
router.post('/login', HandleUserLogin)


module.exports = router;