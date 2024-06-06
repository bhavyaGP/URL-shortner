const User = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');

async function HandleUserSignSignUP(req, res) {

    const { username, email, password } = req.body;
    await User.create({
        username,
        email,
        password
        
    });
    return res.redirect('/')
}

async function HandleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.status(400).render('login', { error: 'Invalid email or password' });
    }

    //making a new session id with uid
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect('/')
}
module.exports = {
    HandleUserSignSignUP,
    HandleUserLogin
}