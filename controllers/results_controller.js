const Result = require('../models/result');
module.exports.update = async function(req, res) {
    console.log("======req body==============", req.body);

    try {
        const result = await Result.findById(req.params.id);

        let body = req.body;

        if (result && req.user.id == result.user) {
            result.pass = body.pass,
                result.fail = body.fail,
                result.onHold = body.onHold,
                result.doNotAttempt = body.doNotAttempt,
                result.finalResult = body.finalResult
            result.save();
            console.log("===========Results==========", result);
            return res.send({ success: true, data: { result: result }, message: "Successfully  results updated" });
        } else {
            return res.send({ success: false, data: { result: result }, message: "You can not update  results" });
        }

    } catch (error) {
        return res.send({ success: false, message: "Error in finding/updating  results" });
    }
}