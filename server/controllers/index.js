const userController = require('./user/userController');
const hospitalController = require('./hospital/hospitalController');
const ambulanceServiceController = require('./ambulance/ambulanceServiceController');
const oxygenCylinderController = require('./oxygenCylinder/oxygenCylinderController');
const bloodBankController = require('./bloodBank/bloodBankController');
const ambulanceController = require('./ambulance/ambulanceController');
const authController = require('./auth/authController')
const enquiryController = require('./enquiry/enquiryController')
const userAuthController = require('./auth/userAuthController')
const feedbackController = require('./feedback/feedbackController');

module.exports = {
    userController,
    hospitalController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
    authController,
    userAuthController,
    enquiryController,
    feedbackController,
};