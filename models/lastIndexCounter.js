const mongoose = require('mongoose');
const lastIndexCounterSchema = new mongoose.Schema({
    lastIndexOfBatch: {
        type: Number,
        //required: true,
    },
    lastIndexOfStudents: {
        type: Number,
        //required: true,
    }
});

const LastIndexCounter = mongoose.model('LastIndexCounter', lastIndexCounterSchema);

module.exports = LastIndexCounter;