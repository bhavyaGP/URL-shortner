const express = require('express');
const app = express();
const URLRoutes = require('./routes/url');
const port = 8000;
const URL = require('./model/url');
const db = require('./connect');
const staticRoutes = require('./routes/staticRoutes');


//ejs
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', URLRoutes);
app.use('/', staticRoutes);


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

