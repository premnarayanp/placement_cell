const Batch = require('../models/batch');
const LastIndexCounter = require("../models/lastIndexCounter");

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
            const lastIndexCounter = await LastIndexCounter.findOne({});
            if (lastIndexCounter == null) {
                lastIndexCounter = await LastIndexCounter.create({
                    lastIndexOfBatch: 100,
                    lastIndexOfStudents: 100
                });
            }
            // console.log(lastIndexCounter);

            const batch = await Batch.create({
                batchId: lastIndexCounter.lastIndexOfBatch + 1,
                name: req.body.name,
                user: req.user.id
            });

            lastIndexCounter.lastIndexOfBatch = lastIndexCounter.lastIndexOfBatch + 1;
            await lastIndexCounter.save();

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


//delete Batches
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