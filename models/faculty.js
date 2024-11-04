// models/Product.js
const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    campus:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    }    
});

const Faculty = mongoose.model('faculties', FacultySchema);

module.exports = Faculty;
