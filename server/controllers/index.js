const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const hospitalAmbulanceController = require('./hospital/hospitalAmbulanceController');
const ambulanceServiceController = require('./ambulance/ambulanceServiceController');
const oxygenCylinderController = require('./oxygencylinder/oxygenCylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');
const ambulanceController = require('./ambulance/ambulanceController');
const loginController = require('./auth/loginController')


module.exports = {
    userController,
    hospitalController,
    hospitalAmbulanceController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
    loginController,
};