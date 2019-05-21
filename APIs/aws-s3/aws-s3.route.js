const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const helper = require('./aws-s3.helper')
const singleUpload = helper.upload.single('image')
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();


router.post('/image-upload', multipartMiddleware, function (req, res) {
    singleUpload(req, res, function (err, some) {
        if (err) {
            return res.status(422).send({
                errors: [{
                    title: 'Image Upload Error',
                    detail: err.message
                }]
            });
        }

        return res.json({
            'imageUrl': req.file.location
        });
    });
})



// router.route("/init")
//     .get(jsonParser, async function (req, res) {
//         try {
//             var newObject = await helper.init(req);
//             res.json(newObject);
//         } catch (err) {
//             console.log("Error:", err)
//             res.status(409).send({
//                 message: err
//             });
//             return;
//         }
//     });




module.exports = {
    router: router
};