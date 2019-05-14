const express = require('express');
const DBconnecter = express.Router();
const mongoose = require('mongoose');
// mLab DB
const mLabDB = "mongodb://userjenhao:2loixrui@ds211625.mlab.com:11625/ur_movies";
// Localhost DB
const localDB = "mongodb://localhost:27017/ur_movies";

mongoose.connect(localDB, function (err) {
    if (err) {
        console.log("The MongoDB is NOT connected,err:", err);
    } else {
        console.log("The MongoDB is connected!!");
    }
});

module.exports = DBconnecter;