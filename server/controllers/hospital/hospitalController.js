const {Hospital} = require('../../models');

exports.addHospital = async(req, res) => {

    try{
        const name = req.body.Name;
        const address = req.body.Address;
        const regNo = req.body.RegNo;
        const contact = req.body.contact;
        
        const category = req.body.category;
        const specialization = req.body.specialization;

        const hospital = new Hospital({
            name: name,
            contact: contact,
            address: address,
            specialization: specialization,
            category: category
        });
        await hospital.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
    }
};