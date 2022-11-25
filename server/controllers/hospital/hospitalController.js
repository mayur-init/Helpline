const {Hospital} = require('../../models');

exports.addHospital = async(req, res, next) => {

    try{
        const name = req.body.name;
        const contact = req.body.contact;
        const address = req.body.address;
        const category = req.body.category;
        const specialization = req.body.specialization;
/*
        if(category == 'private')
            category = false;
        else
            category = true;
*/
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