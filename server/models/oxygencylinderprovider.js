const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oxygencylinderproviderSchema = new Schema({

    providerName: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    regdId: {type: String, required: true, unique: true},
    parentRegdId: {type: String},
    contactNo: { type: Number, required: true, unique: true},
    password: {type: String, required: true},

}, { timestamps: true });

module.exports = mongoose.model('Oxygencylinderprovider', oxygencylinderproviderSchema, 'oxygencylinderproviders');