const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
const ownerSchema = new Schema({

    name: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true}
}, { timestamps: true });
*/

const ambulanceSchema = new Schema({

    providerName: { type: String, required: true },
    contact: { type: Number, required: true, unique: true},
    availability: { type: Boolean, default: false},
    owner: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true},

    vehicleNo: { type: String, required: true, unique: true},
    registration: {type: String, required: true, unique: true},
    driverContact: { type: Number, required: true, unique: true}

    latitude: { type: String},
    altitude: { type: String}
}, { timestamps: true });


module.exports = mongoose.model('Ambulance', userSchema, 'ambulances');