const {OxygenCylinderProvider} = require('../../models');

exports.addOxygenCylinderProvider = async(req, res) => {

    const providerName = req.body.ServiceProviderName;
    const email = req.body.Email;
    const address = req.body.Address;
    const regdId = req.body.RegdId;
    const parentRegdId = req.body.ParentRegdId;
    const contactNo = req.body.ContactNo;
    const password = req.body.Password;

    if(!providerName || !email || !address || !contactNo || !password)
        return res.status(422).json({error : "Some fields are empty"});

    try{
        const oxygenCylinderExist = await OxygenCylinderProvider.findOne({contactNo : contactNo});
        if(oxygenCylinderExist){
            return res.status(422).json({msg : "contact no already exist"});
        }

        const oxygenCylinderExist1 = await OxygenCylinderProvider.findOne({email : email});
        if(oxygenCylinderExist1){
            return res.status(422).json({msg : "email already exist"});
        }

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
        const hospitalId = req.params.regdId;
        const oxygenCylinderProviders = await OxygenCylinderProvider.find({parentRegdId : hospitalId});
        if(oxygenCylinderProviders.length === 0)
            return res.status(200).json({msg : "Not found"});
        res.status(200).json(oxygenCylinderProviders);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};

exports.updateOxygenCylinder = async(req, res) => {
    const contactNo = req.body.contactNo;
    const email = req.body.email;

    try{
        if(contactNo){
            const oxygenCylinderExist = await OxygenCylinderProvider.findOne({contactNo : contactNo});
            if(oxygenCylinderExist){
                return res.status(422).json({msg : "contact no already exist"});
            }
        }

        if(email){
            const oxygenCylinderExist1 = await OxygenCylinderProvider.findOne({email : email});
            if(oxygenCylinderExist1){
                return res.status(422).json({msg : "email already exist"});
            }
        }

        const providerId = req.params.regdId;
        const response = await OxygenCylinderProvider.findByIdAndUpdate({"regdId":providerId}, {$set : req.body} , {new : true});
        if(!response)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}; 

exports.deleteOxygenCylinderProvider = async(req, res) => {
    try{
        const providerId = req.params.regdId;
        const response = await OxygenCylinderProvider.findOneAndDelete({"regdId": providerId});
        if(!response)
            return res.status(200).json({msg : "Not found"});
        res.status(200).json({msg : "Success"});
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
        if(oxygenCylinderProvider.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(oxygenCylinderProvider);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}