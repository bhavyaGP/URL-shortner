require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = process.env.mongoUrl;

mongoose.set('strictQuery', true);

mongoose.connect(mongoUrl); // no options needed

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = db; // corrected export
