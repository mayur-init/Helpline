const {BloodBank} = require('../../models');

// to add a oxygencylinderprovider
exports.addBloodBank = async(req, res) => {

    try{
        const name = req.body.ServiceProviderName;
        const regNo = req.body.RegdNo;
        const email = req.body.Email;
        const contact = req.body.ContactNo;
        const address = req.body.Address;

        const bloodBank = new BloodBank({
            name: name,
            regNo: regNo,
            email: email,
            contactNumber: contact,
            address: address    
        });
        await bloodBank.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};

exports.getBloodBanks = async(req, res) => {
    try{
        const bloodBanks = await BloodBank.find();
        if(bloodBanks.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(bloodBanks);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};

exports.updateBloodBank = async(req, res) => {
    try{
        const bloodBankId = req.params.id;
        const response = await BloodBank.findByIdAndUpdate(bloodBankId, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.deleteBloodBank = async(req, res) => {
    try{
        const bloodBankId = req.params.id;
        const response = await BloodBank.findByIdAndRemove(bloodBankId);
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.getParticularBloodBank = async(req, res) => {
    try{
        const bloodBankId = req.params.id;
        const bloodbank = await BloodBank.findById(bloodBankId);
        if(bloodbank === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(bloodbank);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}