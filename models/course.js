const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    scoreDSA: {
        type: String,
        // required: true,
    },
    scoreWebD: {
        type: String,
        // required: true,
    },
    scoreReact: {
        type: String,
        // required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    // batch: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Batch'
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;