const shortid = require("shortid");
const URL = require('../model/url');


async function generateNewURL(req, res) {

    if (!req.body.redirectUrl) return res.status(400).json({ error: "url is required" });

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectUrl: req.body.redirectUrl,
        visitTime: [],
        createdby: req.user._id,
    });
    return res.render('GET', {
        protocol: req.protocol,
        host: req.get('host'),
        originalUrl: req.originalUrl,
        id: shortID
    });
    // return res.status(201).json({ shortId: shortID });
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId }); 
    return res.json({
        totalClicks: result.visitTime.length,
        analytics: result.visitTime,
    });
}
module.exports = { generateNewURL, handleGetAnalytics };
