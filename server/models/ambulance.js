const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
const ownerSchema = new Schema({

    name: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true}
}, { timestamps: true });
*/

const ambulanceSchema = new Schema({

    serviceProviderName: { type: String, required: true },
    contactNumber: { type: Number, required: true, unique: true},
    availability: { type: Boolean, default: false},
    owner: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true},

    vehicleNumber: { type: String, required: true, unique: true},
    registrationNumber: {type: String, required: true, unique: true},
    driverContactNumber: { type: Number, required: true, unique: true},

    latittude: { type: String},
    longitude: { type: String}
}, { timestamps: true });


module.exports = mongoose.model('Ambulance', ambulanceSchema, 'ambulances');