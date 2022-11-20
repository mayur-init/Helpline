const axios = require('axios');
const { reset } = require('nodemon');
const configEnv = require('../config');

const googleMapApiController = {

    async getNearby(req, res, next) {

        let config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.lattitude}%${req.longitude}&radius=1500&type=Hospital&keyword=private&key=${configEnv.API_KEY}`,
            headers: {}
        }

        // console.log(`lattitude: ${req.lattitude}, longitude: ${req.longitude}`);

        try {
            let response = await axios(config);

            // if(response.data.error_message)
            //     console.log(response.data.error_message);
            
            res.send(JSON.stringify(response.data));

        } catch (err) {
            console.log(err);
        }

        next();
    }
};

module.exports = googleMapApiController;