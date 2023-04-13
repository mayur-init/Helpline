const {Oxygencylinderprovider} = require('../../models');

// to add a oxygencylinderprovider
exports.addOxygencylinderprovider = async(req, res) => {

    try{
        const name = req.body.OxygenCylinderProviderName;
        const regNo = req.body.RegdNo;
        const email = req.body.Email;
        const contact = req.body.ContactNo;
        const address = req.body.Address;

        const oxygencylinder = new Oxygencylinderprovider({
            providerName: name,
            regdNo: regNo,
            email: email,
            contactNo: contact,
            address: address    
        });
        await oxygencylinder.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};