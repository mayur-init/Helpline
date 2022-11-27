const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hospitalSchema = new Schema({

    name: { type: String, required: true },
    address: { type: String, required: true},
    contactNumber: { type: Number, required: true, unique: true},
    category: {type: String},
    specialization: { type: String}
}, { timestamps: true });


module.exports = mongoose.model('Hospital', hospitalSchema, 'hospitals');