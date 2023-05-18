const { BloodBank } = require('../../models');
const bcrypt = require('bcryptjs');

exports.addBloodBank = async (req, res) => {

    const providerName = req.body.ServiceProviderName;
    const email = req.body.Email;
    const address = req.body.Address;
    const regdId = req.body.RegdId;
    const parentRegdId = req.body.ParentRegdId;
    const contactNo = req.body.ContactNo;
    const password = req.body.Password;

    if (!providerName || !email || !address || !contactNo || !password)
        return res.status(422).json({ error: "Some fields are empty" });

    try {
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const bloodBankExist = await BloodBank.findOne({ contactNo: contactNo });
        if (bloodBankExist) {
            return res.status(422).json({ msg: "contact no already exist" });
        }

        const bloodBankExist1 = await BloodBank.findOne({ email: email });
        if (bloodBankExist1) {
            return res.status(422).json({ msg: "email already exist" });
        }

        const bloodBank = new BloodBank({
            providerName,
            email,
            address,
            regdId,
            parentRegdId,
            contactNo,
            password: hashedPassword,
        });
        await bloodBank.save();

        res.status(201).json({ msg: "success" });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Some issue" });
    }
};
//done
exports.getBloodBanks = async (req, res) => {
    const userlocation = req.params.userlocation;
    if (userlocation === null)
        return res.status(400).json({ msg: 'User location is null' });
    else {
        try {
            const bloodBanks = await BloodBank.find({ address: { $regex: userlocation, $options: 'i' } });
            if (bloodBanks.length === 0)
                return res.status(404).json({ msg: "No data exists" });
            res.status(200).json(bloodBanks);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ msg: "Some issue" });
        }
    }
};
//done
exports.updateBloodBank = async (req, res) => {
    const bloodbankId = req.params.regdId;
    const contactNo = req.body.contactNo;
    const email = req.body.email;

    try {
        let bloodbank = await BloodBank.findOne({ regdId: bloodbankId });
        if (bloodbank) {
            if (bloodbank.contactNo !== contactNo) {
                const bloodbankExist = await BloodBank.findOne({ contactNo: contactNo });
                if (bloodbankExist) {
                    return res.status(200).json({ msg: "contact no already exist" });
                }
            }

            if (bloodbank.email !== email) {
                const bloodbankExist1 = await BloodBank.findOne({ email: email });
                if (bloodbankExist1) {
                    return res.status(200).json({ msg: "email already exist" });
                }
            }
        }
        else
            return res.status(404).json({ msg: "Not found" });

        const updatedBloodBank = await BloodBank.findOneAndUpdate({ regdId: bloodbankId }, { $set: req.body }, { new: true });
        if (updatedBloodBank)
            return res.status(200).json({ msg: "success" });
        return res.status(404).json({ msg: "Not found" });

    } catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Some issue" });
    }
};
//done
exports.deleteBloodBank = async (req, res) => {
    try {
        const bloodBankId = req.params.regdId;
        const response = await BloodBank.findOneAndDelete({ "regdId": bloodBankId });
        if (!response)
            return res.status(404).json({ msg: "Not found" });
        res.status(200).json({ msg: "Success" });
    }
    catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
};
//done
exports.getParticularBloodBank = async (req, res) => {
    try {
        const bloodBankId = req.params.regdId;
        const bloodbank = await BloodBank.find({ "regdId": bloodBankId });
        if (bloodbank.length === 0)
            return res.status(404).json({ msg: "Not found" });
        res.status(200).json(bloodbank);
    }
    catch (err) {
        res.status(400).json({ msg: "Some issue" });
    }
}