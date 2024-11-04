const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    full_name:{
        type: String,
        required: true,
    },
    MSSV:{
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
    personal_email:{
        type:String,
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

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;