const Advertising = require('../../Models/advertising.models');

function init(req) {
    return new Promise(async function (resolve, reject) {

        try {
            var Model = new Advertising({}, {}, true);
            resolve(Model);

        } catch (err) {
            reject('init Error, Error:', err);
        }
    });
}

function create(req) {
    return new Promise(async function (resolve, reject) {
        try {
            var Model = new Advertising();
            var body = req.body;
            delete body._id;
            if (Model) {

                var object = Model;
                if (body) {
                    for (var prop in body) {
                        object[prop] = body[prop];
                    }
                }
                var result = await object.save();
                resolve(result);

            }

        } catch (err) {
            reject('Err:', err);
        }
    });
}


function getAll(req) {
    return new Promise(async function (resolve, reject) {
        try {

            var objeects = await Advertising.find()
            resolve(objeects);
        } catch (err) {
            reject('API "get all" err:', err);
        }
    });
}

function getById(req) {
    return new Promise(async function (resolve, reject) {
        try {

            var _query = {
                _id: req.params._id,
            }
            var objeect = await Advertising.findOne(_query)
            if (objeect) {
                resolve(objeect);
            } else {
                reject("Can not find this item by Id:" + req.params._id)
            }
        } catch (err) {
            reject('API "get all" err:', err);
        }
    });

}


function deleteObject(req, _userId) {

    return new Promise(async function (resolve, reject) {
        try {

            var _query = {
                _id: req.params._id,
            }
            var objeect = await Advertising.deleteOne(_query)

            if (objeect.n === 1) {
                resolve("The item deleted successfully");
            } else {
                reject("Can not delete this item by Id:" + req.params._id)
            }
            // ok: 1 if no errors occurred
            // n: the number of documents deleted. Equal to deletedCount.
        } catch (err) {
            reject('API "get all" err:', err);
        }
    });

}

function update(req) {

    return new Promise(async function (resolve, reject) {
        try {

            var _query = {
                _id: req.params._id,
            }

            var _body = req.body;
            var _options = {
                new: true
            }

            var objeect = await Advertising.findByIdAndUpdate(_query, _body, _options)

            if (objeect) {
                resolve(objeect);
            } else {
                reject("Can not delete this item by Id:" + req.params._id)
            }
            // ok: 1 if no errors occurred
            // n: the number of documents deleted. Equal to deletedCount.
        } catch (err) {
            reject('API "get all" err:', err);
        }
    });
}



module.exports = {

    init: init,
    create: create,
    get: getAll,
    getById: getById,
    delete: deleteObject,
    update: update,


};