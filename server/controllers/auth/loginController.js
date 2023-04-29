const {
    User,
    Hospital,
    AmbulanceService,
    BloodBank,
    OxygenCylinderProvider,
} = require('../../models')

exports.verifyUserLogin = (req, res, next) =>{

    try{


    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }

}

exports.verifyServiceProviderLogin = async (req, res, next) =>{

    try{

        // console.log(req.body);
        
        const regdId = req.body.RegdId;
        const password = req.body.Password;
        const providerType = req.body.ProviderType;

        var response = [];
        var verified = false;

        //fetching data using regdId
        if(providerType === "HOSP"){
            response = await Hospital.find({"regdId": regdId});

        }else if(providerType === "AMBU"){
            response = await AmbulanceService.find({"regdId": regdId});


        }else if(providerType === "BLOOD"){
            response = await BloodBank.find({"regdId": regdId});


        }else if(providerType === "OXYG"){
            response = await OxygenCylinderProvider.find({"regdId": regdId});

        }

        // console.log(response);
        //console.log(response[0].password);        

        if(response.length === 0){
            return res.status(200).json({registered: false, verified: verified});

        }else{
             //checking if password is matching or not
            if(response[0].password == password){
                verified = true;
            }

            if(verified === false){
                res.status(200).json({registered: true, verified: verified});
            }else{
                
                res.status(200).json({registered: true, verified: verified});
            }
        }


    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }

}