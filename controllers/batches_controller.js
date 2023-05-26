const Batch = require('../models/batch');
//create Batches
module.exports.create = async function(req, res) {
    const results = {};
    if (!req.body.name) {
        results.success = false;
        results.data = "Please fill batch name";
        return res.send(results);
    }

    try {
        const batch = await Batch.findOne({ name: req.body.name });
        if (!batch) {

            const batch = await Batch.create({
                name: req.body.name,
                user: req.user.id
            });
            //console.log("batch=", batch);
            results.success = true;
            results.data = { batch: batch };
            return res.send(results);
        } else {
            results.success = false;
            results.data = "Batch Already Exist";
            return res.send(results);
        }

    } catch (error) {
        //console.log('error in finding batch');
        results.success = false;
        results.data = "error in finding/creating batch";
        return res.send(results);
    }
}

module.exports.delete = async function(req, res) {
    try {
        // let batch = await Batch.findByIdAndRemove(req.params.id);
        // if (batch) {
        //     return res.send({ success: true, message: "Batch Deleted Successfully" });
        // } else {
        //     return res.send({ success: false, message: "this batch Not Exist" });
        // }

        let batch = await Batch.findById(req.params.id);
        if (batch && batch.user == req.user.id) {
            await Batch.findByIdAndRemove(req.params.id);
            // await Batch.deleteOne({ "_id": ObjectId(req.params.id) });
            return res.send({ success: true, message: "Batch Deleted Successfully" });
        } else {
            return res.send({ success: false, message: "You can not delate this Batch" });
        }

    } catch (error) {
        return res.send({ success: false, message: "Error while deleting this Batch" });
    }
}