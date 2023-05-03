const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const hospitalAmbulanceController = require('./hospital/hospitalAmbulanceController');
const hospitalBloodBankController = require('./hospital/hospitalBloodBankController');
const hospitalOxygenCylinderController = require('./hospital/hospitalOxygenCylinderController');
const ambulanceServiceController = require('./ambulance/ambulanceServiceController');
const oxygenCylinderController = require('./oxygenCylinder/oxygenCylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');
const ambulanceController = require('./ambulance/ambulanceController');
const authController = require('./auth/authController')
const enquiryController = require('./enquiry/enquiryController')

module.exports = {
    userController,
    hospitalController,
    hospitalAmbulanceController,
    hospitalBloodBankController,
    hospitalOxygenCylinderController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
    authController,
    enquiryController,
};