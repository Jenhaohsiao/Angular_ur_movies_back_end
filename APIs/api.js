const express = require('express');
const router = express.Router();
const advertisingApi = require('./advertising/advertising.route');
const s3Api = require('./aws-s3/aws-s3.route')


router.get('/', function (req, res) {
    res.send('Root From API route');
});


module.exports = {
    router: router,
    advertisings: advertisingApi.router,
    s3: s3Api.router,
}