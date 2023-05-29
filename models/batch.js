const mongoose = require('mongoose');
const batchSchema = new mongoose.Schema({
    batchId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],

    studentsCount: {
        type: Number,
        // required: true, 
    }

}, {
    timestamps: true
});


const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;