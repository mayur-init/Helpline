const express = require('express');
const router = express.Router();
const googleMapApiController = require('../controllers/googleMapApiController');
const {
    hospitalController,
    userController,
    ambulanceController,
    oxygencylinderController,
    bloodBankController,
} = require('../controllers');

// router.get('/', (req, res) =>{res.send('<h2>Project-Helpline: server is running...</h2>')});

//google map api releated routes
router.get('/getNearby', googleMapApiController.getNearby);

// to collect user data
router.post('/user', userController.addUser);

// to collect hospital data
router.post('/hospital', hospitalController.addHospital);

// to register ambulance 
router.post('/ambulance', ambulanceController.addAmbulance);

// to register oxygen cylinder provider
router.post('/oxygencylinder', oxygencylinderController.addOxygencylinderprovider);
router.get('/oxygencylinderproviders', oxygencylinderController.getOxygenCylinderProviders);

// to register blood bank service
router.post('/bloodbank', bloodBankController.addBloodBank);
router.get('/bloodbanks', bloodBankController.getBloodBanks);

module.exports = router;