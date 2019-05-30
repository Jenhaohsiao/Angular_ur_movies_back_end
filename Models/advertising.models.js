const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisingSchema = new Schema({


    name: {
        type: String,
        default: null
    },

    title: {
        type: String,
        default: null
    },

    description: {
        type: String,
        default: null

    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: null

    },
    imageUrl: {
        type: String,
        default: "http://fakeimg.pl/200x150/?text=No Image"
    },

    linkUrl: {
        type: String,
        default: null
    },

});



module.exports = mongoose.model('advertising', advertisingSchema)