const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch'
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    interviewList: [{
        interview: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview'
        },
        result: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result'
        }
    }]

}, {
    timestamps: true
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student