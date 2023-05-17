const { Enquiry, User } = require('../../models');

// to add an ambulance
exports.addEnquiry = async (req, res, next) => {

    try {
        const enquiryId = req.body.EnquiryId;
        const enquiryType = req.body.EnquiryType;
        const enquiry = req.body.Enquiry;
        const userId = req.body.UserId;

        const enquirydb = new Enquiry({
            enquiryId,
            enquiryType,
            enquiry,
            userId
        });
        await enquirydb.save();
        res.status(201).json({ msg: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};


exports.getEnquiriesByParentId = async (req, res) => {
    try {
        const createrId = req.params.parentRegdId;
        const enquiries = await Enquiry.find({ "parentRegdId": createrId });
        if (enquiries.length === 0)
            return res.status(404).json({ msg: "Not found" });
        res.status(200).json(enquiries);
    }
    catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
};

exports.updateParticularEnquiry = async (req, res) => {
    try {
        const enquiryId = req.params.enquiryId;
        const response = await Enquiry.updateOne({ "enquiryId": enquiryId }, { $set: req.body }, { new: true });
        if (response === null)
            return res.status(404).json({ msg: "Not found" });
        res.status(200).json({ msg: "Updated Successfully" });
    } catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
};

exports.deleteParticularEnquiry = async (req, res) => {
    try {
        const enquiryId = req.params.enquiryId;
        const response = await Enquiry.removeOne({ "enquiryId": enquiryId });
        if (response === null)
            return res.status(404).json({ msg: "Not found" });
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
};

exports.getAllRelatedEnquiries = async (req, res) => {
    const location = req.body.location;
    const enquiryType = req.body.enquiryType;

    if (location === null || enquiryType === null)
        return res.status(400).json({ msg: 'User location or enquiry type is null' });

    else {
        try {
            if (enquiryType === '1' || enquiryType === '2' || enquiryType === '3') {
                const enquiries = await Enquiry.find({ enquiryType: enquiryType }).populate('userId');
                console.log(enquiries);
                
                if (enquiries.length > 0) {
                    return res.status(200).json(enquiries);
                } else {
                    return res.status(404).json({ msg: "no enquiries" });
                }
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ msg: "Some issue" });
        }
    }
}