const express = require('express');
const router = express.Router();
const advertisingApi = require('./advertising/advertising.route');


router.get('/', function (req, res) {
    res.send('Root From API route');
});


module.exports = {
    router: router,
    advertising: advertisingApi.router,
}