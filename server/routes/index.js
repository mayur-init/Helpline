const express = require('express');
const router = express.Router();
const googleMapApiController = require('../contorllers/googleMapApiController');

router.get('/', (req, res) =>{res.send('<h1>Express server is running...</h1>')});

//google map api releated routes
router.get('/getNearby', googleMapApiController.getNearby);

module.exports = router;