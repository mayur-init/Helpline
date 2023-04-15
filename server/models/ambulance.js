const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true},
    regNo: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    contactNumber: { type: Number, required: true, unique: true},
    
}, { timestamps: true });


module.exports = mongoose.model('Ambulance', ambulanceSchema, 'ambulances');