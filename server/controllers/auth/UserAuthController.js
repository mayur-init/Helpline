const {
    User,
    RefreshToken
} = require('../../models');

const bcrypt = require('bcryptjs');
const config = require('../../config');
const JwtService = require('../../services/JwtService');


exports.verifyUserLogin = async (req, res, next) =>{
    try{
        const access_token = req.body.AccessToken;
        // console.log(access_token);

        //verifying access_token and extacting userId from it
        const jwtRes =  JwtService.verify(access_token, config.JWT_SECRET);
        // console.log(jwtRes.regdId);

        //check if user exist exist in db
        const response = await User.find({"regdId": jwtRes.regdId});
        // console.log(response);
        
        if(response.length > 0){
            return res.status(200).json(response[0]);
        }else{
            res.status(400).json({registered: false});
        }
    }catch(err){
        console.log(err);
    }   
}

exports.verifyRefreshToken = async (req, res, next) =>{
    try{
        const refresh_token = req.body.RefreshToken;
        // console.log(access_token);

        //verifying access_token and extacting userId from it
        // console.log(config.REFRESH_SECRET);

        const jwtRes =  JwtService.verify(refresh_token, config.REFRESH_SECRET);
        // console.log(jwtRes.regdId);

        //check if user exist exist in db
        const response = await User.find({"regdId": jwtRes.regdId});
        // console.log(response);
        
        if(response.length > 0){
            return res.status(200).json(response[0]);
        }else{
            res.status(400).json({msg: 'Refresh Token Expired'});
        }
    }catch(err){
        console.log(err);
    }
}