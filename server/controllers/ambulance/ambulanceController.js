const {Ambulance} = require('../../models');

// to add an ambulance
exports.addAmbulance = async(req, res, next) => {

    try{
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