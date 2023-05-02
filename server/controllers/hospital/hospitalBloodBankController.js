const {BloodBank} = require('../../models');

exports.addBloodBank = async(req, res) => {

    const providerName = req.body.ServiceProviderName;
    const email = req.body.Email;
    const address = req.body.Address;
    const regdId = req.body.RegdId;
    const parentRegdId = req.body.ParentRegdId;
    const contactNo = req.body.ContactNo;
    const password = req.body.Password;

    if(!providerName || !email || !address || !contactNo || !password || !parentRegdId)
        return res.status(422).json({error : "Some fields are empty"});

    try{
        const bloodBankExist = await BloodBank.findOne({contactNo : contactNo});
        if(bloodBankExist){
            return res.status(422).json({msg : "contact no already exist"});
        }

        const bloodBankExist1 = await BloodBank.findOne({email : email});
        if(bloodBankExist1){
            return res.status(422).json({msg : "email already exist"});
        }

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
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.getBloodBanks = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const bloodBanks = await BloodBank.find({parentRegdId : hospitalId});
        if(bloodBanks.length === 0)
            return res.status(200).json({msg : "No data found"});
        res.status(200).json(bloodBanks);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.updateBloodBank = async(req, res) => {

    const contactNo = req.body.contactNo;
    const email = req.body.email;
    try{
        if(contactNo){
            const bloodBankExist = await BloodBank.findOne({contactNo : contactNo});
            if(bloodBankExist){
                return res.status(422).json({msg : "contact no already exist"});
            }
        }
        if(email){
            const bloodBankExist1 = await BloodBank.findOne({email : email});
            if(bloodBankExist1){
                return res.status(422).json({msg : "email already exist"});
            }
        }
        const bloodBankId = req.params.regdId;
        const response = await BloodBank.findOneAndUpdate({"regdId" : bloodBankId}, {$set : req.body} , {new : true});
        if(!response)
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
        const response = await BloodBank.findOneAndDelete({"regdId" : bloodBankId});
        if(!response)
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
        if(bloodbank.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(bloodbank);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}