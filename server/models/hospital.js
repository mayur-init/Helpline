const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hospitalSchema = new Schema({

    name: { type: String, required: true },
    address: { type: String, required: true},
    regNo: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    contactNumber: { type: Number, required: true, unique: true},
    category: {type: String},
    specialization: { type: String},
    availableBeds: {type: Number}
}, { timestamps: true });


module.exports = mongoose.model('Hospital', hospitalSchema, 'hospitals');