const {Hospital} = require('../../models');

exports.addHospital = async(req, res) => {

    try{
        const providerName = req.body.ServiceProviderName;
        const email = req.body.Email;
        const address = req.body.Address;
        const regdId = req.body.RegdId;
        const contactNo = req.body.ContactNo;
        const password = req.body.Password;
        const category = 'unknown';

        const hospital = new Hospital({
            providerName,
            email,
            address,
            regdId,
            contactNo,
            password,
            category
        });
        await hospital.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
    }
};

exports.getParticularhospital = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const hospital = await Hospital.find({"regdId": hospitalId});
        if(hospital === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(hospital);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}