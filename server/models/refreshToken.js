const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    
    refreshToken: { type: String, required: true, unique: true },
    
}, { timestamps: true });


module.exports = mongoose.model('RefreshToken', refreshTokenSchema, 'refreshTokens');