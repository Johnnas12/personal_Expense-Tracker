const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    completed: {
        type: Boolean,
        default: false,
    },
    
    backgroundColor: {
        type: String,
        default: '#ffffff', // Default color
    },
});

module.exports = mongoose.model('Event', eventSchema);