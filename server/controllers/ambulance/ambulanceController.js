const {Ambulance} = require('../../models');

// to add an ambulance
exports.addAmbulance = async(req, res, next) => {

    try{
        const name = req.body.ServiceProviderName;
        const regNo = req.body.RegdNo;
        const email = req.body.Email;
        const contact = req.body.ContactNo;
        const address = req.body.Address;

        const ambulance = new Ambulance({
            name: name,
            regNo: regNo,
            email: email,
            contactNumber: contact,
            address: address    
        });
        await ambulance.save();
        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};


exports.getAmbulances = async(req, res) => {
    try{
        const ambulances = await Ambulance.find();
        if(ambulances.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(ambulances);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.deleteAmbulance = async(req, res) => {
    try{
        const ambulanceId = req.params.id;
        const response = await Ambulance.findByIdAndRemove(ambulanceId);
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};