const {Oxygencylinderprovider} = require('../../models');

// to add a oxygencylinderprovider
exports.addOxygencylinderprovider = async(req, res) => {

    try{
        const name = req.body.ServiceProviderName;
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

exports.getOxygenCylinderProviders = async(req, res) => {
    try{
        const oxygenCylinderProviders = await Oxygencylinderprovider.find();
        if(oxygenCylinderProviders.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(oxygenCylinderProviders);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}

exports.deleteOxygenCylinderProvider = async(req, res) => {
    try{
        const providerId = req.params.id;
        const response = await Oxygencylinderprovider.findByIdAndRemove(providerId);
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
    