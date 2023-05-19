const {
    User,
    Hospital,
    AmbulanceService,
    BloodBank,
    OxygenCylinderProvider,
    Enquiry,
} = require('../../models')
const bcrypt = require('bcryptjs');


module.exports.generateRegdId = async (req, res, next) => {
    try {
        const idType = req.body.IdType;
        const generatedId = `${idType.toUpperCase()}${Math.random().toString().substring(2, 8)}`;
        // console.log(generatedId);
        var response = [];

        if (idType === "USER") {
            response = await User.find({ "regdId": generatedId });
        } else if (idType === "HOSP") {
            response = await Hospital.find({ "regdId": generatedId });

        } else if (idType === "AMBU") {
            response = await AmbulanceService.find({ "regdId": generatedId });

        } else if (idType === "BLOOD") {
            response = await BloodBank.find({ "regdId": generatedId });

        } else if (idType === "OXYG") {
            response = await OxygenCylinderProvider.find({ "regdId": generatedId });

        } else if (idType === "ENQR") {
            // console.log(generatedId);
            response = await Enquiry.find({ "enquiryId": generatedId });
            // console.log(response);
        } else {
            return res.status(400).json({ msg: 'Invalid IdType' });
        }

        if (response.length === 0) {
            return res.status(200).json({ generatedId: generatedId });
        }
        // else {
        //     return  await generateRegdId();
        // }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}



exports.verifyServiceProviderLogin = async (req, res, next) => {

    try {

        // console.log(req.body);

        const regdId = req.body.RegdId;
        const password = req.body.Password;
        const providerType = req.body.ProviderType;

        var response = [];
        var verified = false;

        //fetching data using regdId
        if (providerType === "HOSP") {
            response = await Hospital.find({ "regdId": regdId });

        } else if (providerType === "AMBU") {
            response = await AmbulanceService.find({ "regdId": regdId });


        } else if (providerType === "BLOOD") {
            response = await BloodBank.find({ "regdId": regdId });


        } else if (providerType === "OXYG") {
            response = await OxygenCylinderProvider.find({ "regdId": regdId });

        }

        // console.log(response);
        //console.log(response[0].password);        

        if (response.length === 0) {
            return res.status(200).json({ registered: false, verified: verified });

        } else {
            //checking if password is matching or not
            const correctPassword = await bcrypt.compare(password, response[0].password);
            if (correctPassword) {
                verified = true;
            }

            if (verified === false) {
                res.status(200).json({ registered: true, verified: verified });
            } else {

                res.status(200).json({ registered: true, verified: verified });
            }
        }


    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

exports.getHashedPassword = async (req, res, next) =>{
    const password = req.params.password;
    if(password === null)
        return res.status(400).json({msg: 'Password is null'});
    else{
        try{
            const hashedPassword = await bcrypt.hash(password, 10);

            if(await password !== null){
                return res.status(200).json({hashedPassword: hashedPassword});
            }
        }catch(err){
            console.log(err);
        }
    }
}

