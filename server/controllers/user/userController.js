const { User, RefreshToken } = require('../../models');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const JwtService = require('../../services/JwtService');

// to add a user
exports.addUser = async (req, res) => {
    const userName = req.body.UserName;
    const contactNo = req.body.ContactNo;
    const regdId = req.body.RegdId;
    const location = req.body.Location;

    if (userName === null || contactNo === null || location === null || regdId === null) {
        console.log(req.body);
        return res.status(422).json({ error: "Some fields are empty" });

    } else {
        try {
            //generate tokens
            const access_token = JwtService.sign({ regdId: regdId });
            const refresh_token = JwtService.sign({ regdId: regdId }, '1y', config.REFRESH_SECRET);

            const user = new User({
                userName,
                contactNo,
                regdId,
                location,
                accessToken: access_token,
            });

            const refreshToken = new RefreshToken({
                refreshToken: refresh_token
            });

            await user.save();
            await refreshToken.save();
            res.status(201).json({ msg: "success", access_token: access_token, refresh_token: refresh_token });
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.regdId;
        const user = await User.find({ "regdId": userId });
        if (user.length === 0)
            return res.status(404).json({ msg: "Not found" });
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Some issue" });
    }
}

exports.updateUser = async (req, res) => {
    const contactNo = req.body.contactNo;
    try {
        const userId = req.params.regdId;
        const user = await User.findOne({regdId : userId});
        if (user.contactNo !== contactNo) {
            const userExist = await User.findOne({ contactNo: contactNo });
            if (userExist) {
                return res.status(422).json({ msg: "contact no already exist" });
            }
        }
        
        const response = await User.findOneAndUpdate({ "regdId": userId }, { $set: req.body }, { new: true });
        if (response)
            return res.status(200).json({ msg: "Updated Successfully" });
        return res.status(404).json({ msg: "Not found" });

    } catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
};

exports.removeUser = async (req, res) => {
    const refresh_token = req.body.Refresh_token;
    const userId = req.params.regdId;
    if(refresh_token === null || userId === null)
        return res.status(400).json({msg: 'UserId or Refresh token is null'});
    else{
        try {
            const response = await User.findOneAndDelete({ "regdId": userId });
            const resp = await RefreshToken.findOneAndDelete({"refreshToken": refresh_token});
            if (!response || !resp)
                return res.status(404).json({ msg: "Not found" });
            res.status(200).json({ msg: "Deleted Successfully" });
        }
        catch (err) {
            res.status(400).json({ msg: "Some issue" });
        }
    }
};

exports.updateUserLocation = async (req, res, next) =>{
    const userId = req.body.UserId;
    const newLocation = req.body.NewLocation;
    if(newLocation === null || userId === null)
        return res.status(400).json({msg: 'New Location is null'});
    else{
        try{
            const response = await User.findOneAndUpdate({regdId: userId}, {$set: {location: newLocation}});
            if(response)
                return res.status(200).json({msg: 'success'});
        }catch(err){
            console.log(err);
        }
    }
}