const {User} = require('../../models');

// to add a user
exports.addUser = async(req, res) => {
    const userName = req.body.UserName;
    const contactNo = req.body.ContactNo;
    const regdId = req.body.RegdId;
    const location = req.body.Location;

    if(!userName || !contactNo || !location)
        return res.status(422).json({error : "Some fields are empty"});

    try{
        
        const userExist = await User.findOne({contactNo : contactNo});
        if(userExist){
            return res.status(422).json({msg : "contact no already exist"});
        }
        const user = new User({
            userName,
            contactNo,
            regdId,
            location
        });
        await user.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
};

exports.getUser = async(req, res) => {
    try{
        const userId = req.params.regdId;
        const user = await User.find({"regdId":userId});
        if(user.length === 0)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}

exports.updateUser = async(req, res) => {
    const contactNo = req.body.contactNo;
    try{
        if(contactNo){
            const userExist = await User.findOne({contactNo : contactNo});
            if(userExist){
                return res.status(422).json({msg : "contact no already exist"});
            }
        }
        const userId = req.params.regdId;
        const response = await User.findOneAndUpdate({"regdId":userId}, {$set : req.body} , {new : true});
        if(response)
            res.status(200).json({ msg : "Updated Successfully"});
        return res.status(404).json({msg : "Not found"});
        
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.removeUser = async(req, res) => {
    try{
        const userId = req.params.regdId;
        const response = await User.findOneAndDelete({"regdId":userId});
        if(!response)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Deleted Successfully"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};