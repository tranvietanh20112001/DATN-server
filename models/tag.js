const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    color:{
        type: String,
    },
})

const Tag = mongoose.model('tag', TagSchema);

module.exports = Tag;