const {Hospital} = require('../../models');

exports.addHospital = async(req, res) => {

    const providerName = req.body.ServiceProviderName;
    const email = req.body.Email;
    const address = req.body.Address;
    const regdId = req.body.RegdId;
    const contactNo = req.body.ContactNo;
    const password = req.body.Password;
    const category = 'unknown';

    if(!providerName || !email || !address || !contactNo || !password || !category)
        return res.status(422).json({error : "Some fields are empty"});

    try{
            const hospitalExist = await Hospital.findOne({contactNo : contactNo});
            if(hospitalExist){
                return res.status(422).json({msg : "contact no already exist"});
            }

            const hospitalExist1 = await Hospital.findOne({email : email});
            if(hospitalExist1){
                return res.status(422).json({msg : "email already exist"});
            }

            const hospital = new Hospital({
                providerName,
                email,
                address,
                regdId,
                contactNo,
                password,
                category
            });
            await hospital.save();
        
            res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(404).json({msg : "Some issue"});
    }
};
//done
exports.getHospitals = async(req, res) => {
    try{
        const hospitals = await Hospital.find();
        if(hospitals.length === 0)
            return res.status(404).json({msg : "No data exists"});
        res.status(200).json(hospitals);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.updateHospital = async(req, res) => {

    const contactNo = req.body.contactNo;
    const email = req.body.email;

    try{
        if(contactNo){
            const hospitalExist = await Hospital.findOne({contactNo : contactNo});
            if(hospitalExist){
                return res.status(422).json({msg : "contact no already exist"});
            }
        }
        if(email){
            const hospitalExist1 = await Hospital.findOne({email : email});
            if(hospitalExist1){
                return res.status(422).json({msg : "email already exist"});
            }
        }
        const hospitalId = req.params.regdId;
        const response = await Hospital.findOneAndUpdate({"regdId" : hospitalId}, {$set : req.body} , {new : true});
        if(response)
            return res.status(200).json({msg : "Updated Successfully"});
        res.status(404).json({msg : "Not found"});
        
    }catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//incomplete
exports.deleteHospital = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const response = await Hospital.findOneAndDelete({"regdId" : hospitalId});
        if(!response)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Success"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.getParticularhospital = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const hospital = await Hospital.findOne({"regdId": hospitalId});
        if(hospital.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(hospital);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}