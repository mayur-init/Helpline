const {Hospital} = require('../../models');

exports.addHospital = async(req, res) => {

    try{
        const providerName = req.body.Name;
        const email = req.body.email;
        const address = req.body.Address;
        const regdId = req.body.RegNo;
        const contactNo = req.body.contact;
        const password = req.body.password;
        const category = 'unknown';

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
    }
};

exports.getHospitals = async(req, res) => {
    try{
        const hospitals = await Hospital.find().select('providerName email address contactNo -_id category');
        if(hospitals.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(hospitals);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};

exports.updateHospital = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const response = await Hospital.findOneAndUpdate({regdId : hospitalId}, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.deleteHospital = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const response = await Hospital.findOneAndDelete({regdId : hospitalId});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Success"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.getParticularHospital = async(req, res) => {
    try{
        const hospitalId = req.params.regdId;
        const hospital = await Hospital.findOne({regdId : hospitalId})
                                        .select(["-__v","-createdAt","-updatedAt"]);
        if(hospital === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(hospital);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}