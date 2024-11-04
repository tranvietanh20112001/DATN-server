const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link_Youtube_URL: {
        type: String,
        required: true,
    },
    link_img_banner: {
        type: String,
    },
    link_demo_project: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    file_report_URL: {
        type: String,
    },
    student_id: {
        type: String,
        required: true,
    },
    student_name: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: String,
        required: true,
    },
    teacher_name: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    campus: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    number_of_likes: {
        type: Number,
        default: 0,
    },
    number_of_views: { 
        type: Number, 
        default: 0 
    },
    images: [
        {
            url: { type: String },
        }
    ],
    tags: [
        {
            type: String,
        }
    ]
});

const Project = mongoose.model('projects', ProjectSchema);

module.exports = Project;
