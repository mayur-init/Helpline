const { Ambulance } = require('../../models');

exports.addAmbulance = async (req, res, next) => {

    const driverName = req.body.DriverName;
    const parentRegdId = req.body.ParentRegdId;
    const driverContactNo = req.body.DriverContactNo;

    if (!driverName || !driverContactNo)
        return res.status(422).json({ error: "Some fields are empty" });

    try {

        // console.log(req.body);
        const driverName = req.body.DriverName;
        const parentRegdId = req.body.ParentRegdId;
        const driverContactNo = req.body.DriverContactNo;

        const ambulanceExist = await Ambulance.findOne({ driverContactNo: driverContactNo });
        if (ambulanceExist) {
            return res.status(422).json({ msg: "contact no already exist" });
        }

        const ambulance = new Ambulance({
            driverName,
            parentRegdId,
            driverContactNo
        });
        await ambulance.save();

        res.status(201).json({ msg: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ msg: "Some issue" });
    }
};

exports.getAllAmbulances = async (req, res) => {

    try {
        const ambulanceServiceId = req.params.regdId;
        const ambulances = await Ambulance.find({ parentRegdId: ambulanceServiceId });
        if (ambulances.length === 0)
            return res.status(404).json({ msg: "No data exists" });
        res.status(200).json(ambulances);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Some issue" });
    }
};

exports.deleteAmbulance = async (req, res) => {
    try {
        const contact = req.params.contact;
        const response = await Ambulance.findOneAndDelete({ "driverContactNo": contact });
        if (!response)
            return res.status(200).json({ msg: "Not found" });
        res.status(200).json({ msg: "Success" });
    }
    catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
};
