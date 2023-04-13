const ambulanceController = require('./ambulance/ambulanceController');
const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const oxygencylinderController = require('./oxygencylinder/oxygencylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');

module.exports = {
    ambulanceController,
    userController,
    hospitalController,
    oxygencylinderController,
    bloodBankController,
};