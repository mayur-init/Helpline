const {Ambulance} = require('../../models');

// to add a user
exports.addAmbulance = async(req, res, next) => {

    try{
        const providerName = req.body.providerName;
        const contact = req.body.contact;
        const owner = req.body.owner;
        const aadhar = req.body.aadhar;
        const vehicleNo = req.body.vehicleNo;
        const registration = req.body.registration;
        const driverContact = req.body.driverContact;
 
        const ambulance = new Ambulance({
            providerName: providerName,
            contact: contact,
            owner: owner,
            aadhar: aadhar,
            vehicleNo: vehicleNo,
            registration: registration,
            driverContact: driverContact,
            
            latitude: '',
            altitude: ''
        });
        await ambulance.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        return next(err);
    }
};