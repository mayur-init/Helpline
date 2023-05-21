const {AmbulanceService} = require('../../models');
const {Ambulance} = require('../../models');
const bcrypt = require('bcryptjs');

exports.addAmbulanceService = async(req, res, next) => {

    const providerName = req.body.ServiceProviderName;
    const email = req.body.Email;
    const address = req.body.Address;
    const regdId = req.body.RegdId;
    const parentRegdId = req.body.ParentRegdId;
    const contactNo = req.body.ContactNo;
    const password = req.body.Password;

    if(!providerName || !email || !address || !contactNo || !password){
        // console.log(req.body);
        return res.status(422).json({error : "Some fields are empty"});
    }

    try{
            //hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const ambulanceServiceExist = await AmbulanceService.findOne({contactNo : contactNo});
            if(ambulanceServiceExist){
                return res.status(422).json({msg : "contact no already exist"});
            }

            const ambulanceServiceExist1 = await AmbulanceService.findOne({email : email});
            if(ambulanceServiceExist1){
                return res.status(422).json({msg : "email already exist"});
            }

            const ambulanceService = new AmbulanceService({
                providerName,
                email,
                address,
                regdId,
                parentRegdId,
                contactNo, 
                password: hashedPassword,
            });
            
            await ambulanceService.save();
            res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.getAmbulanceServices = async(req, res) => {
    const userlocation = req.params.userlocation;
    if(userlocation === null)
        return res.status(400).json({msg: 'User location is null'});
    else{
        try{
            const ambulanceServices = await AmbulanceService.find({address: {$regex: userlocation, $options: 'i'}});

            if(ambulanceServices.length === 0)
                return res.status(404).json({msg : "No data exists"});
                
            res.status(200).json(ambulanceServices);
        }
        catch(err){
            console.log(err);
            res.status(400).json({msg : "Some issue"});
        }
    }
    
};
//done
exports.updateAmbulanceService = async(req, res) => {
    const ambulanceServiceId = req.params.regdId;
    const contactNo = req.body.contactNo;
    const email = req.body.email;

    try{
        let ambulanceService = await AmbulanceService.findOne({regdId : ambulanceServiceId});
        if(ambulanceService){
            if(ambulanceService.contactNo !== contactNo){
                const ambulanceServiceExist = await AmbulanceService.findOne({contactNo : contactNo});
                if(ambulanceServiceExist){
                    return res.status(200).json({msg : "contact no already exist"});
                }
            }

            if(ambulanceService.email !== email){
                const ambulanceServiceExist1 = await AmbulanceService.findOne({email : email});
                if(ambulanceServiceExist1){
                    return res.status(200).json({msg : "email already exist"});
                }
            }

            if(ambulanceService.password !== req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
        }
        else
            return res.status(404).json({msg : "Not found"});

        const updatedAmbService = await AmbulanceService.findOneAndUpdate({regdId : ambulanceServiceId}, {$set : req.body}, {new : true});
        if(updatedAmbService)
            return res.status(200).json({msg : "success", data : updatedAmbService});
        return res.status(404).json({msg : "Not found"});
        
    }catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
};
//done
exports.deleteAmbulanceService = async(req, res) => {
    try{
        const ambulanceServiceId= req.params.regdId;
        const response = await AmbulanceService.findOne({"regdId" : ambulanceServiceId});
        if(response){
            const ambulances = await Ambulance.deleteMany({parentRegdId : ambulanceServiceId});
            if(ambulances){
                const result = await AmbulanceService.deleteOne({"regdId" : ambulanceServiceId});
                if(result)
                    return res.status(200).json({msg : "Success"});
                return res.status(404).json({msg : "Issue"});
            }
            const result = await AmbulanceService.deleteOne({"regdId" : ambulanceServiceId});
            if(result)
                return res.status(200).json({msg : "Success"});
            return res.status(404).json({msg : "Issue"});
        }
        return res.status(200).json({msg : "No data found"});
    }
    catch(err){
        res.status(404).json({msg : "Some issue"});
    }
};

exports.getParticularAmbulanceService = async(req, res) => {
    try{
        const ambulanceServiceId = req.params.regdId;
        const ambulancsService = await AmbulanceService.find({"regdId" : ambulanceServiceId});
        // console.log(ambulancsService);
        
        if(ambulancsService.length === 0)
            return res.status(404).json({msg : "Not found"});

        res.status(200).json(ambulancsService);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}