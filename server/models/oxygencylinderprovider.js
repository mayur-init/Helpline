const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oxygencylinderproviderSchema = new Schema({

    providerName: { type: String, required: true },
    regdNo: {type: String, required: true, unique: true},
    email: {type: String, unique: true},
    contactNo: { type: Number, required: true, unique: true},
    address: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Oxygencylinderprovider', oxygencylinderproviderSchema, 'oxygencylinderproviders');