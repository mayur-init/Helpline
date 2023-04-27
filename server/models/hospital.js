const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hospitalSchema = new Schema({

    providerName: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    address: { type: String, required: true},
    regdId: {type: String, required: true, unique: true},
    contactNo: { type: Number, required: true, unique: true},
    password: {type: String, required: true},
    category: {type: String},
    
}, { timestamps: true });


module.exports = mongoose.model('Hospital', hospitalSchema, 'hospitals');