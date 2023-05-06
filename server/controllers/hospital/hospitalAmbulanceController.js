const {Ambulance} = require('../../models');

exports.addAmbulance = async(req, res) => {

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
        res.status(400).json(err);
    }
};

exports.getAllAmbulances = async(req, res) => {
    try {
        const hospitalId = req.params.regdId;
        const ambulances = await Ambulance.find({parentRegdId : hospitalId});
        if(ambulances.length === 0)
            return res.status(200).json({msg : "No data found"});
        res.status(200).json(ambulances);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.deleteAmbulance = async(req, res) => {
    try{
        const ambulanceContact = req.params.contact;
        const response = await Ambulance.findOneAndDelete({driverContactNo: ambulanceContact});
        if(!response)
            return res.status(200).json({msg : "Not found"});
        res.status(200).json({msg : "success"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};
