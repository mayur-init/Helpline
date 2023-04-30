const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const hospitalAmbulanceController = require('./hospital/hospitalAmbulanceController');
const ambulanceServiceController = require('./ambulance/ambulanceServiceController');
const oxygenCylinderController = require('./oxygencylinder/oxygenCylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');
const ambulanceController = require('./ambulance/ambulanceController');
const authController = require('./auth/authController')
const enquiryController = require('./enquiry/enquiryController')

module.exports = {
    userController,
    hospitalController,
    hospitalAmbulanceController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
    authController,
    enquiryController,
};