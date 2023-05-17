const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enquirySchema = new Schema({
    
    enquiryId: { type: String, required: true, unique: true },
    enquiryType: {type: String, required: true},
    enquiry: {type: String, required: true},
    userId : {type : Schema.Types.ObjectId, ref : 'User', required: true},

}, { timestamps: true });


module.exports = mongoose.model('Enquiry', enquirySchema, 'enquiries');