const {User} = require('../../models');

// to add a user
exports.addUser = async(req, res, next) => {

    try{
        const name = req.body.name;
        const contact = req.body.contact;
        //const address = req.body.address;

        const user = new User({
            name: name,
            contact: contact,
            //address: address
            // put code for altitude and longitude
            longitude: '',
            latittude: ''
        });
        await user.save();

        res.status(201).json({msg: "success"});
    }
    catch(err){
        console.log(err);
    }
};