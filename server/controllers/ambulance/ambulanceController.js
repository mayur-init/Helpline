const {Ambulance} = require('../../models');

// to add an ambulance
exports.addAmbulance = async(req, res, next) => {

    try{
        console.log(req.body);
        const driverName = req.body.DriverName;
        const parentRegdId = req.body.ParentRegdId;
        const driverContactNo = req.body.DriverContactNo;

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
        res.status(400).json(err);
    }
};

exports.getAllAmbulances = async(req, res) => {
    try {
        const ambulanceServiceId = req.params.regdId;
        const ambulances = await Ambulance.find({parentRegdId : ambulanceServiceId});
        if(ambulances.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(ambulances);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};
/*
exports.updateAmbulance = async(req, res) => {
    try{
        const ambulanceServiceId = req.params.regdId;
        const response = await Ambulance.findOneAndUpdate({parentRegdId : ambulanceServiceId}, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({ msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}; 
*/
exports.deleteAmbulance = async(req, res) => {
    try{
        const ambulanceContact = req.params.contact;
        const response = await Ambulance.findOneAndDelete({driverContactNo: ambulanceContact});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "success"});
    }
    catch(err){
        res.status(400).json({msg : err});
    }
};