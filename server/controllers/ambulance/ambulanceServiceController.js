const {AmbulanceService} = require('../../models');

// to add an ambulance
exports.addAmbulanceService = async(req, res, next) => {

    try{
        
        const providerName = req.body.ServiceProviderName;
        const email = req.body.Email;
        const address = req.body.Address;
        const regdId = req.body.RegdId;
        const parentRegdId = req.body.ParentRegdId;
        const contactNo = req.body.ContactNo;
        const password = req.body.Password;

        const ambulanceService = new AmbulanceService({
            providerName,
            email,
            address,
            regdId,
            parentRegdId,
            contactNo, 
            password
        });
        await ambulanceService.save();
        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};


exports.getAmbulanceServices = async(req, res) => {
    try{
        const ambulanceServices = await AmbulanceService.find().select('providerName email address contactNo -_id');;
        if(ambulanceServices.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(ambulanceServices);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.updateAmbulanceService = async(req, res) => {
    try{
        const ambulanceServiceId = req.params.regdId;
        const response = await AmbulanceService.updateOne({"regdId": ambulanceServiceId}, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({ msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}; 
// incomplete route
exports.deleteAmbulanceService = async(req, res) => {
    try{
        const ambulanceServiceId = req.params.regdId;
        const response = await AmbulanceService.remove({"regdId": ambulanceServiceId});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "success"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.getParticularAmbulanceService = async(req, res) => {
    try{
        const ambulanceServiceId = req.params.regdId;
        const ambulanceService = await AmbulanceService.find({"regdId": ambulanceServiceId});
        if(ambulanceService === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(ambulanceService);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}