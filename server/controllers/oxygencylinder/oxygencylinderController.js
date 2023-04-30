const {OxygenCylinderProvider} = require('../../models');

// to add a oxygencylinderprovider
exports.addOxygenCylinderProvider = async(req, res) => {

    try{
        const providerName = req.body.ServiceProviderName;
        const email = req.body.Email;
        const address = req.body.Address;
        const regdId = req.body.RegdId;
        const parentRegdId = req.body.ParentRegdId;
        const contactNo = req.body.ContactNo;
        const password = req.body.Password;

        const oxygenCylinder = new OxygenCylinderProvider({
            providerName,
            email,
            address,
            regdId,
            parentRegdId,
            contactNo, 
            password   
        });
        await oxygenCylinder.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};

exports.getOxygenCylinderProviders = async(req, res) => {
    try{
        const oxygenCylinderProviders = await OxygenCylinderProvider.find();
        if(oxygenCylinderProviders.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(oxygenCylinderProviders);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};

exports.updateOxygenCylinder = async(req, res) => {
    try{
        const providerId = req.params.regdId;
        const response = await OxygenCylinderProvider.updateOne({"regdId":providerId}, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({data : response, msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}; 

exports.deleteOxygenCylinderProvider = async(req, res) => {
    try{
        const providerId = req.params.regdId;
        const response = await OxygenCylinderProvider.remove({"regdId": providerId});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
    
exports.getParticularProvider = async(req, res) => {
    try{
        const oxyCyProviderId = req.params.regdId;
        const oxygenCylinderProvider = await OxygenCylinderProvider.find({"regdId": oxyCyProviderId});
        if(oxygenCylinderProvider === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(oxygenCylinderProvider);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}