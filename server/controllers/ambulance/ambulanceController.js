const {Ambulance} = require('../../models');

// to add an ambulance
exports.addAmbulance = async(req, res, next) => {

    try{
        const name = req.body.ServiceProviderName;
        const regNo = req.body.RegdNo;
        const email = req.body.Email;
        const contact = req.body.ContactNo;
        const address = req.body.Address;

        const ambulance = new Ambulance({
            name: name,
            regNo: regNo,
            email: email,
            contactNumber: contact,
            address: address    
        });
        await ambulance.save();
        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};