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
    hospitalAmbulanceController,
    hospitalBloodBankController,
    hospitalOxygenCylinderController,
    feedbackController,
} = require('../controllers');

// router.get('/', (req, res) =>{res.send('<h2>Project-Helpline: server is running...</h2>')});

//google map api releated routes
router.get('/getNearby', googleMapApiController.getNearby);

// user routes
router.post('/user', userController.addUser);           // to register a user
router.get('/users/:regdId', userController.getUser);       // to view a user
router.put('/users/:regdId',userController.updateUser);
router.delete('/users/:regdId', userController.removeUser);

// to collect hospital data
router.post('/hospital', hospitalController.addHospital);
router.get('/hospitals', hospitalController.getHospitals);
router.put('/hospital/:regdId', hospitalController.updateHospital);
router.delete('/hospital/:regdId', hospitalController.deleteHospital);
router.get('/hospital/:regdId', hospitalController.getParticularhospital);
router.get('/hospital/getallservices/:hospitalRegdId', hospitalController.getAllRegisteredServices);

//hospital-ambulance routes
router.post('/hospital-ambulance', hospitalAmbulanceController.addAmbulance);
router.get('/hospital-ambulances/:regdId', hospitalAmbulanceController.getAllAmbulances);
router.delete('/hospital-ambulance/:contact', hospitalAmbulanceController.deleteAmbulance);

//hospital-bloodbank routes
router.post('/hospital-bloodbank', hospitalBloodBankController.addBloodBank);
router.get('/hospital-bloodbanks/:regdId', hospitalBloodBankController.getBloodBanks);
router.put('/hospital-bloodbank/:regdId', hospitalBloodBankController.updateBloodBank);
router.delete('/hospital-bloodbank/:regdId', hospitalBloodBankController.deleteBloodBank);
router.get('/hospital-bloodbank/:regdId', hospitalBloodBankController.getParticularBloodBank);

 //hospital-oxygen cylinder routes
router.post('/hospital-oxygencylinder', hospitalOxygenCylinderController.addOxygenCylinderProvider);
router.get('/hospital-oxygencylinders/:regdId', hospitalOxygenCylinderController.getOxygenCylinderProviders);
router.put('/hospital-oxygencylinder/:regdId', hospitalOxygenCylinderController.updateOxygenCylinder);
router.delete('/hospital-oxygencylinder/:regdId', hospitalOxygenCylinderController.deleteOxygenCylinderProvider);
router.get('/hospital-oxygencylinder/:regdId', hospitalOxygenCylinderController.getParticularProvider); 


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

//feedback routes
router.post('/feedback', feedbackController.addFeedback);
router.post('/feedback/:_id', feedbackController.deleteFeedback);

module.exports = router;