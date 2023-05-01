const {Ambulance} = require('../../models');

exports.addAmbulance = async(req, res, next) => {

    const driverName = req.body.DriverName;
    const parentRegdId = req.body.ParentRegdId;
    const driverContactNo = req.body.DriverContactNo;

    if(!driverName || !driverContactNo)
        return res.status(422).json({error : "Some fields are empty"});

    try{
            const ambulanceExist = await Ambulance.findOne({driverContactNo : driverContactNo});
            if(ambulanceExist){
                return res.status(422).json({msg : "contact no already exist"});
            }

            const ambulance = new Ambulance({
                driverName,
                parentRegdId,
                driverContactNo
            });
            await ambulance.save();
        
            res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(404).json({msg : "Some issue"});
    }
};
//done
exports.getAllAmbulances = async(req, res) => {
    try{
        const ambulanceServiceId = req.params.regdId;
        const ambulances = await Ambulance.find({ parentRegdId : ambulanceServiceId});
        if(ambulances.length === 0)
            return res.status(404).json({msg : "No data exists"});
        res.status(200).json(ambulances);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
/*
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
        if(response)
            return res.status(200).json({msg : "Updated Successfully"});
        res.status(404).json({msg : "Not found"});
        
    }catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}; */

exports.deleteAmbulance = async(req, res) => {
    try{
        const contact = req.params.contact;
        const response = await Ambulance.findOneAndDelete({"driverContactNo" : contact});
        if(!response)
            return res.status(200).json({msg : "Not found"});
        res.status(200).json({msg : "Success"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};
