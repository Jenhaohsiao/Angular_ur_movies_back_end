var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var helper = require('./advertising.helper')


router.route("/init")
    .get(jsonParser, async function (req, res) {
        try {
            var newObject = await helper.init(req);
            res.json(newObject);
        } catch (err) {
            console.log("Error:", err)
            res.status(409).send({
                message: err
            });
            return;
        }
    });



router.route("/")
    .get(async function (req, res) {
        try {
            var Objects = await helper.get(req);
            res.json(Objects);
        } catch (err) {
            res.status(409).send({
                message: err
            });
            return;
        }
    })

    .post(jsonParser, async function (req, res) {
        try {
            var savedObject = await helper.create(req);
            res.json(savedObject);
        } catch (err) {
            res.status(409).send({
                message: err
            });
            return;
        }

    });


router.route("/:_id")
    .get(jsonParser, async function (req, res) {
        try {
            var ObjectById = await helper.getById(req);

            res.json(ObjectById);
            return;
            //  res.json(rug);
        } catch (err) {
            res.status(409).send({
                message: err
            });
            return;
        }

    })

    .delete(jsonParser, async function (req, res) {

        try {
            var deletedObject = await helper.delete(req);
            res.json(deletedObject);

        } catch (err) {

            res.status(409).send({
                message: err
            });
            return;
        }

    })

    .put(jsonParser, async function (req, res) {

        try {
            var updatedObject = await helper.update(req);
            res.json(updatedObject);

        } catch (err) {

            res.status(409).send({
                message: err
            });
            return;
        }

    });

module.exports = {
    router: router
};