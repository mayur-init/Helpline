const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const ambulanceServiceController = require('./ambulance/ambulanceServiceController');
const oxygenCylinderController = require('./oxygencylinder/oxygenCylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');
const ambulanceController = require('./ambulance/ambulanceController');
const loginController = require('./auth/loginController')
const enquiryController = require('./enquiry/enquiryController')

module.exports = {
    userController,
    hospitalController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
    loginController,
    enquiryController,
};