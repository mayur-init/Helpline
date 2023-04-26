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

// user routes
router.post('/user', userController.addUser);           // to register a user
router.get('/users/:id', userController.getUser);       // to view a user
router.put('/users/:id',userController.updateUser);
router.delete('/users/:id', userController.removeUser);

// to collect hospital data
router.post('/hospital', hospitalController.addHospital);

// ambulance routes
router.post('/ambulance', ambulanceController.addAmbulance);
router.get('/ambulances', ambulanceController.getAmbulances);
router.put('/ambulances/:id', ambulanceController.updateAmbulance);
router.delete('/ambulances/:id', ambulanceController.deleteAmbulance);

// oxygen cylinder provider routes
router.post('/oxygencylinder', oxygencylinderController.addOxygencylinderprovider);
router.get('/oxygencylinderproviders', oxygencylinderController.getOxygenCylinderProviders);
router.put('/oxygencylinders/:id', oxygencylinderController.updateOxygenCylinder);
router.delete('/oxygencylinder/:id', oxygencylinderController.deleteOxygenCylinderProvider);

// blood bank service routes
router.post('/bloodbank', bloodBankController.addBloodBank);
router.get('/bloodbanks', bloodBankController.getBloodBanks);
router.put('/bloodbanks/:id', bloodBankController.updateBloodBank);
router.delete('/bloodbanks/:id', bloodBankController.deleteBloodBank);

module.exports = router;