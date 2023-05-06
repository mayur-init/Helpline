const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
    
    driverName: { type: String, required: true },
    parentRegdId: {type: String},
    driverContactNo: { type: Number, required: true, unique: true},
    
}, { timestamps: true });


module.exports = mongoose.model('Ambulance', ambulanceSchema, 'ambulances');