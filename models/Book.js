const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    author: {
        type: String,
        required: [true, 'Please add a author name']
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre']
    },
    condition: {
        type: String,
        required: [true, 'Please specify the condition of the book']
    },
    availabilityStatus: {
        type: Boolean,
        required: [true, 'Please specify the availability status of the book']
    },
    userId: String
});

BookSchema.index({ title: 'text', author: 'text', genre: 'text', condition: 'text', availability: 'text' });

module.exports = mongoose.model('Book', BookSchema);