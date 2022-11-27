const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({

    name: { type: String, required: true },
    contactNumber: { type: Number, required: true, unique: true},
    //address: { type: String},
    longitude: { type: String},
    latittude: { type: String}

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');