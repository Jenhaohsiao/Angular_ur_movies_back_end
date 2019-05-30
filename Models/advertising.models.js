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

}, {
    collection: 'advertisings',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        virtuals: true
    }
});



module.exports = mongoose.model('advertising', advertisingSchema)