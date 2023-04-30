const {BloodBank} = require('../../models');

exports.addBloodBank = async(req, res) => {

    try{
        const providerName = req.body.ServiceProviderName;
        const email = req.body.Email;
        const address = req.body.Address;
        const regdId = req.body.RegdId;
        const parentRegdId = req.body.ParentRegdId;
        const contactNo = req.body.ContactNo;
        const password = req.body.Password;


        const bloodBank = new BloodBank({
            providerName,
            email,
            address,
            regdId,
            parentRegdId,
            contactNo, 
            password   
        });
        await bloodBank.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};
//done
exports.getBloodBanks = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const bloodBanks = await BloodBank.find({parentRegdId : hospitalId});
        if(bloodBanks.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(bloodBanks);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.updateBloodBank = async(req, res) => {
    try{
        const bloodBankId = req.params.regdId;
        const response = await BloodBank.update({"regdId" : bloodBankId}, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.deleteBloodBank = async(req, res) => {
    try{
        const bloodBankId = req.params.regdId;
        const response = await BloodBank.remove({"regdId" : bloodBankId});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Success"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.getParticularBloodBank = async(req, res) => {
    try{
        const bloodBankId = req.params.regdId;
        const bloodbank = await BloodBank.find({"regdId" : bloodBankId});
        if(bloodbank === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(bloodbank);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}