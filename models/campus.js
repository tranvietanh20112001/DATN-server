const mongoose = require('mongoose');

const CampusSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    location:{
        type: String,
    },
    image:{
        type: String,
    }
})

const Campus = mongoose.model('campus', CampusSchema);

module.exports = Campus;