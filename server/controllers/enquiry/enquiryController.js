const {Enquiry, User} = require('../../models');

// to add an ambulance
exports.addEnquiry = async(req, res, next) => {

    try{
        const enquiryId = req.body.EnquiryId;
        const parentRegdId = req.body.ParentRegdId;
        const enquiryType = req.body.EnquiryType;
        const enquiry = req.body.Enquiry;

        const enquirydb = new Enquiry({
            enquiryId,
            parentRegdId,
            enquiryType,
            enquiry
        });
        await enquirydb.save();
        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};


exports.getEnquiriesByParentId = async(req, res) => {
    try{
        const createrId = req.params.parentRegdId;
        const enquiries = await Enquiry.find({"parentRegdId": createrId});
        if(enquiries.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(enquiries);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.updateParticularEnquiry = async(req, res) => {
    try{
        const enquiryId = req.params.enquiryId;
        const response = await Enquiry.updateOne({"enquiryId": enquiryId }, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({ msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
}; 

exports.deleteParticularEnquiry = async(req, res) => {
    try{
        const enquiryId = req.params.enquiryId;
        const response = await Enquiry.remove({"enquiryId": enquiryId });
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

// exports.getAllRelatedEnquiries = async(req, res) => {
//     try{
//         const location = req.params.location;
//         const relatedUsers = await User.find({"location": location});
        
//         if(relatedUsers === null)
//             return res.status(404).json({msg : "No enquiry exists for the location"});
//         res.status(200).json(ambulanceService);
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).json({msg : "Some issue"});
//     }
// }