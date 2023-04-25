const {User} = require('../../models');

// to add a user
exports.addUser = async(req, res) => {

    try{
        const name = req.body.Name;
        const contact = req.body.ContactNumber;
        const lattitude = req.body.lattitude;
        const longitude = req.body.longitude;

        const user = new User({
            name: name,
            contactNumber: contact,
            address: '',
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
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(user === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(user);
    }
    catch(err){
        console.log(err);
        res.status(400).json({msg : "Some issue"});
    }
}

exports.removeUser = async(req, res) => {
    try{
        const userId = req.params.id;
        const response = await User.findByIdAndRemove(userId);
        if(response === null)
            return res.status(404).json({msg : "Not found"});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({msg : "Some issue"});
    }
};