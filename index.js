const express = require('express');
const app = express();
const URLRoutes = require('./routes/url');
const port = process.env.port || 8000;
const URL = require('./model/url');
const db = require('./connect');
const staticRoutes = require('./routes/staticRoutes');
const UserRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const { restrictTologinUseronly, checkAuth } = require('./middleware/auth')
require('dotenv').config();

//ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url', restrictTologinUseronly, URLRoutes);
app.use('/user', UserRoutes)
app.use('/', checkAuth, staticRoutes);

app.get('/get/:shortId', async (req, res) => {
    //create let that old curretn date of string
    let currentDate = new Date().toISOString();

    const URLfromDB = await URL.findOneAndUpdate({
        shortId: req.params.shortId
    },
        {
            $push: { visitTime: { timestamp: currentDate } }
        });
    res.redirect(URLfromDB.redirectUrl);
});






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

