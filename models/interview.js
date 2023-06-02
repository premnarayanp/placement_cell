const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    numOfStudents: {
        type: Number,
        required: true,
    },

    assignedStudentList: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },
        result: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result'
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});


const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;