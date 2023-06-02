const mongoose = require('mongoose');
const resultSchema = new mongoose.Schema({
    pass: {
        type: Boolean,
        required: true,
    },
    fail: {
        type: Boolean,
        required: true,
    },
    onHold: {
        type: Boolean,
        required: true,
    },
    doNotAttempt: {
        type: Boolean,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },

    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;