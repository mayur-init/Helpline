const {User} = require('../../models');

// to add a user
exports.addUser = async(req, res) => {

    try{
        const userName = req.body.UserName;
        const contactNo = req.body.ContactNo;
        const regdId = req.body.RegdId;
        const location = req.body.Location;

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
        if(user === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}

exports.updateUser = async(req, res) => {
    try{
        const userId = req.params.regdId;
        const response = await User.update({"regdId":userId}, {$set : req.body} , {new : true});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({ msg : "Updated Successfully"});
    }catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};

exports.removeUser = async(req, res) => {
    try{
        const userId = req.params.regdId;
        const response = await User.remove({"regdId":userId});
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json({msg : "Deleted Successfully"});
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};