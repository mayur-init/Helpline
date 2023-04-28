const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const ambulanceServiceController = require('./ambulance/ambulanceServiceController');
const oxygenCylinderController = require('./oxygencylinder/oxygenCylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');
const ambulanceController = require('./ambulance/ambulanceController');


module.exports = {
    userController,
    hospitalController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
};