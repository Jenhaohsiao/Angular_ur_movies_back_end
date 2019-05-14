const Advertising = require('../../Models/advertising.models');


function init(req) {
    return new Promise(async function (resolve, reject) {

        try {
            var model = new Advertising({}, {}, true);
            resolve(model);

        } catch (err) {
            reject('init Error, Error:', err);
        }
    });
}

function create(req, doc) {
    return new Promise(async function (resolve, reject) {
        try {
            var Model = self.userModel;
            var body = doc || req.body;
            if (Model) {

                auth.hashPassword(body.verify, async function (err, passHash) {
                    if (err !== null && err !== undefined) {
                        reject(err);
                    } else {
                        var userRecord = new Model();
                        userRecord.username = body.username;
                        userRecord.verify = passHash;
                        var result = await userRecord.save();
                        resolve(result);
                    }

                });
            }

        } catch (err) {
            reject('Create Error. User model is not defined!');
        }
    });
}


function getAll(req) {
    return new Promise(async function (resolve, reject) {
        try {
            var Model = self.userModel;
            if (Model) {
                var userObjs = await Model.find()
                resolve(userObjs);
            } else
                reject('userObjs model is not defined!');
        } catch (err) {
            reject(err);
        }
    });
}

function getById(req) {
    return new Promise(async function (resolve, reject) {
        var Model = self.userModel;
        var id = req.params.id || req.params.model_id;
        if (!id)
            reject('rug Record Id Missing in header config!');

        try {
            if (Model) {
                // var userObj = await Model.findById(req.params.id).populate('imageList');
                var userObj = await Model.findById(id);
                delete userObj._doc.verify;
                resolve(userObj);
            } else
                reject('Get by ID Error. User model is not defined!');
        } catch (err) {
            reject(err);
            return;
        }
    });

}


function deleteObject(req, _userId) {

    return new Promise(async function (resolve, reject) {
        var Model = self.userModel;
        var _userId = req.params.id || _userId
        if (!_userId) {
            reject('User Id is not defined!');
            return;
        }

        if (Model) {

            var userObject = await Model.findById({
                _id: _userId
            }).lean();
            if (!userObject) reject('Delete Error. The User not found for this id!');

            var removeModel = await Model.deleteOne({
                _id: _userId
            });
            if (removeModel.result && removeModel.result.n == 0) {
                reject('Delete Error: The User not found!');
            } else {
                resolve('This User Record has Deleted');
            }
        } else
            reject('Delete Error. User  model is not defined!');
    });

}

function update(req, doc) {

    return new Promise(async function (resolve, reject) {
        try {
            var Model = self.userModel;

            var body = doc || req.body;
            if (!body._id) {
                reject('User Id is not defined!');
                return;
            }


            if (Model) {
                var userModel = await Model.findById(body._id);
                if (!userModel) reject("User not found for id " + body._id);
                var updateObj = {};


                for (var prop in body) {
                    if (['_id', 'created_at', 'updated_at'].includes(prop) || updateObj[prop] == body[prop]) continue;
                    updateObj[prop] = body[prop];
                }


                if (body.verify) {

                    await auth.hashPassword(body.verify, async function (err, passHash) {
                        if (err !== null && err !== undefined) {
                            reject(err);
                        } else {
                            updateObj.verify = passHash;
                        }
                    });
                }

                var updatedUser = await Model.findByIdAndUpdate({
                    _id: body._id
                }, {
                    $set: updateObj
                }, {
                    upsert: false,
                    new: true,
                    lean: true
                });

                resolve(updatedUser);
            } else
                reject('Update Error. User model is not defined!');
        } catch (err) {
            reject(err);
        }
    });
}

function buildQuery(req) {
    var query = {};

    if (!req.query) {
        query.filter = {};
        query.limit = 20;
        query.skip = 0;
        query.sort = {
            "updated_at": -1
        };
    } else {
        query.filter = req.query.filter || {};
        query.limit = parseInt(req.query.limit || 20);
        query.page = parseInt(req.query.page || 1);
        query.skip = (query.page - 1) * (query.limit);
        query.sort = req.query.sort || {
            "updated_at": -1
        };
    }
    return query;
}



module.exports = {

    init: init,
    create: create,
    get: getAll,
    getById: getById,
    delete: deleteObject,
    update: update,


};