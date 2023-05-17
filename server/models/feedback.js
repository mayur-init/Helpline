const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedBackSchema = new Schema({
    
    userName: { type: String, required: true},
    feedBack: {type: String, required: true}

}, { timestamps: true });


module.exports = mongoose.model('FeedBack', feedBackSchema, 'feedbacks');