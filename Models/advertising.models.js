const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisingSchema = new Schema({

    title: {
        type: String,
        // required: true,
        default: null
    },

    description: {
        type: String,
        // required: true,
        default: null

    },
    startDate: {
        type: Date,
        // required: true,
        default: new Date()
    },
    endDate: {
        type: Date,
        // required: true,
        default: null

    },
    image: {
        type: String,
        default: null

    },

})



module.exports = mongoose.model('advertising', advertisingSchema)