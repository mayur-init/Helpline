const { FeedBack } = require('../../models');

exports.addFeedback = async (req, res, next) => {
    const userName = req.body.UserName;
    const feedBack = req.body.FeedBack;

    if (userName === null || feedBack === null) {
        console.log(req.body);
        return res.status(400).json({ msg: 'UserName or Feedback is null' });
    } else {
        try {
            const feedbackdb = new FeedBack({
                userName,
                feedBack,
            });
            await feedbackdb.save();
            res.status(201).json({ msg: "success" });
        } catch (err) {
            console.log(err);
        }
    }
}

exports.deleteFeedback = (req, res, next) => {
    const _id = req.params._id;
    if (_id === null)
        return res.status(400).json({ msg: '_id is null' });
    else {
        try {
            const response = FeedBack.findByIdAndDelete(_id);
            console.log(response);
            if (!response)
                return res.status(200).json({ msg: "Not found" });
            res.status(200).json({ msg: "Success" });
        } catch (err) {
            console.log(err);
        }
    }
}