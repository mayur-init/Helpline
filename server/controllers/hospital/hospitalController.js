const {Hospital} = require('../../models');

exports.addHospital = async(req, res) => {

    try{
        const providerName = req.body.Name;
        const email = req.body.email;
        const address = req.body.Address;
        const regdId = req.body.RegNo;
        const contactNo = req.body.contact;
        const password = req.body.password;
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