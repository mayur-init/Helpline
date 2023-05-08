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
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.getOxygenCylinderProviders = async(req, res) => {
    try{
        const oxygenCylinders = await OxygenCylinderProvider.find();
        if(oxygenCylinders.length === 0)
            return res.status(404).json({msg : "No data exists"});
        res.status(200).json(oxygenCylinders);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.updateOxygenCylinder = async(req, res) => {
    const providerId = req.params.regdId;
    const contactNo = req.body.contactNo;
    const email = req.body.email;

    try{
        let oxyCyPro = await OxygenCylinderProvider.findOne({regdId : providerId});
        if(oxyCyPro){
            if(oxyCyPro.contactNo !== contactNo){
                const oxyCyProExist = await OxygenCylinderProvider.findOne({contactNo : contactNo});
                if(oxyCyProExist){
                    return res.status(200).json({msg : "contact no already exist"});
                }
            }

            if(oxyCyPro.email !== email){
                const oxyCyProExist1 = await OxygenCylinderProvider.findOne({email : email});
                if(oxyCyProExist1){
                    return res.status(200).json({msg : "email already exist"});
                }
            }
        }
        else
            return res.status(404).json({msg : "Not found"});

        const updatedOxyCyPro = await OxygenCylinderProvider.findOneAndUpdate({regdId : providerId}, {$set : req.body}, {new : true});
        if(updatedOxyCyPro)
            return res.status(200).json({msg : "success"});
        return res.status(404).json({msg : "Not found"});
        
    }catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.deleteOxygenCylinderProvider = async(req, res) => {
    try{
        const providerId = req.params.regdId;
        const response = await OxygenCylinderProvider.findOneAndDelete({"regdId" : providerId});
        if(!response)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.getParticularProvider = async(req, res) => {
    try{
        const oxyCyProviderId = req.params.regdId;
        const oxygenCylinderProvider = await OxygenCylinderProvider.find({"regdId" : oxyCyProviderId});
        if(oxygenCylinderProvider.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(oxygenCylinderProvider);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}
