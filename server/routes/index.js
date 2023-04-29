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
    loginController,
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
router.get('/hospital/:regdId', hospitalController.getParticularhospital);

// ambulance service routes
router.post('/ambulanceservice', ambulanceServiceController.addAmbulanceService);
router.get('/ambulanceservice', ambulanceServiceController.getAmbulanceServices);
router.put('/ambulanceservice/:regdId', ambulanceServiceController.updateAmbulanceService);
router.delete('/ambulanceservice/:regdId', ambulanceServiceController.deleteAmbulanceService);
router.get('/ambulanceservice/:regdId', ambulanceServiceController.getParticularAmbulanceService);

// oxygen cylinder provider routes
router.post('/oxygencylinder', oxygenCylinderController.addOxygenCylinderProvider);
router.get('/oxygencylinderproviders', oxygenCylinderController.getOxygenCylinderProviders);
router.put('/oxygencylinders/:regdId', oxygenCylinderController.updateOxygenCylinder);
router.delete('/oxygencylinders/:regdId', oxygenCylinderController.deleteOxygenCylinderProvider);
router.get('/oxygencylinderproviders/:regdId', oxygenCylinderController.getParticularProvider);

// blood bank service routes
router.post('/bloodbank', bloodBankController.addBloodBank);
router.get('/bloodbanks', bloodBankController.getBloodBanks);
router.put('/bloodbanks/:regdId', bloodBankController.updateBloodBank);
router.delete('/bloodbanks/:regdId', bloodBankController.deleteBloodBank);
router.get('/bloodbanks/:regdId', bloodBankController.getParticularBloodBank);

// ambulance routes
router.post('/ambulance', ambulanceController.addAmbulance);

//auth routes
router.post('/providerlogin', loginController.verifyServiceProviderLogin);


module.exports = router;