const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    full_name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    email:{
        type:String,
        required: true,
    },
    campus:{
        type: String,
        required: true,
    },
    faculty:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    }
})

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;