const express = require('express');
const router = express.Router();
const googleMapApiController = require('../controllers/googleMapApiController');
const {
    hospitalController,
    userController,
    ambulanceController
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

module.exports = router;