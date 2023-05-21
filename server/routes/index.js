const express = require('express');
const router = express.Router();
const googleMapApiController = require('../controllers/googleMapApiController');

const {
    hospitalController,
    userController,
    ambulanceServiceController,
    oxygenCylinderController,
    bloodBankController,
    ambulanceController,
    authController,
    userAuthController,
    enquiryController,
    feedbackController,
} = require('../controllers');


//google map api releated routes
router.get('/getNearby', googleMapApiController.getNearby);

// user routes
router.post('/user', userController.addUser);           // to register a user
router.get('/users/:regdId', userController.getUser);       // to view a user
router.put('/users/:regdId', userController.updateUser);
router.post('/updateuserlocation', userController.updateUserLocation);
router.post('/users/:regdId', userController.removeUser);

// hospital service routes
router.post('/hospital', hospitalController.addHospital);
router.get('/hospitals', hospitalController.getHospitals);
router.put('/hospital/:regdId', hospitalController.updateHospital);
router.delete('/hospital/:regdId', hospitalController.deleteHospital);
router.get('/hospital/:regdId', hospitalController.getParticularhospital);
router.get('/hospital/getallservices/:hospitalRegdId', hospitalController.getAllRegisteredServices);

// ambulance service routes
router.post('/ambulanceservice', ambulanceServiceController.addAmbulanceService);
router.get('/ambulanceservice/:userlocation', ambulanceServiceController.getAmbulanceServices);
router.put('/ambulanceservice/:regdId', ambulanceServiceController.updateAmbulanceService);
router.delete('/ambulanceservice/:regdId', ambulanceServiceController.deleteAmbulanceService);
router.get('/ambulanceservice/getparticularprovider/:regdId', ambulanceServiceController.getParticularAmbulanceService);

// oxygen cylinder provider routes
router.post('/oxygencylinder', oxygenCylinderController.addOxygenCylinderProvider);
router.get('/oxygencylinderproviders/:userlocation', oxygenCylinderController.getOxygenCylinderProviders);
router.put('/oxygencylinders/:regdId', oxygenCylinderController.updateOxygenCylinder);
router.delete('/oxygencylinders/:regdId', oxygenCylinderController.deleteOxygenCylinderProvider);
router.get('/oxygencylinderproviders/getparticularprovider/:regdId', oxygenCylinderController.getParticularProvider);

// blood bank service routes
router.post('/bloodbank', bloodBankController.addBloodBank);
router.get('/bloodbanks/:userlocation', bloodBankController.getBloodBanks);
router.put('/bloodbanks/:regdId', bloodBankController.updateBloodBank);
router.delete('/bloodbanks/:regdId', bloodBankController.deleteBloodBank);
router.get('/bloodbanks/getparticularprovider/:regdId', bloodBankController.getParticularBloodBank);

// ambulance routes
router.post('/ambulance', ambulanceController.addAmbulance);
router.get('/ambulances/:regdId', ambulanceController.getAllAmbulances);
router.delete('/ambulances/:contact', ambulanceController.deleteAmbulance);

//auth routes
router.post('/providerlogin', authController.verifyServiceProviderLogin);
router.post('/generateregdid', authController.generateRegdId);
router.post('/verifyuser', userAuthController.verifyUserLogin);
router.post('/verifyrefreshtoken', userAuthController.verifyRefreshToken);
router.get('/gethashedpassword/:password', authController.getHashedPassword);

//enquiry routes
router.post('/enquiry/', enquiryController.addEnquiry);
router.get('/enquiry/:parentRegdId', enquiryController.getEnquiriesByParentId);
router.put('/enquiry/:enquiryId', enquiryController.updateParticularEnquiry);
router.post('/enquiry/:enquiryId', enquiryController.deleteParticularEnquiry);
router.post('/getallrelatedenquiry', enquiryController.getAllRelatedEnquiries);
router.get('/getalllocationenquiries/:location', enquiryController.getAllLocationEnquiries);
router.delete('/removequery/:enquiryId', enquiryController.deleteParticularEnquiry);

//feedback routes
router.post('/feedback', feedbackController.addFeedback);
router.post('/feedback/:_id', feedbackController.deleteFeedback);

module.exports = router;