const Batch = require('../models/batch');
const Student = require('../models/student');
const Course = require('../models/course');
module.exports.courses = async function(req, res) {

}

module.exports.create = async function(req, res) {
    const results = {};
    if (!req.body) {
        results.success = false;
        results.data = "Please fill Details";
        return res.send(results);
    }
    // console.log("==========req.body=================", req.body);

    try {
        // const batch = await Batch.findById(req.body.batch);
        const student = await Student.findById(req.body.student);

        // if (batch && student && student.course == null) {
        if (student && student.course == null && student.user == req.user.id) {

            const course = await Course.create({
                scoreDSA: req.body.scoreDSA,
                scoreWebD: req.body.scoreWebD,
                scoreReact: req.body.scoreReact,
                student: req.body.student,
                // batch: req.body.batch,
                user: req.user.id,
            });
            student.course = course._id;
            student.save();
            console.log("=======course created =========", course);
            results.success = true;
            results.data = { course: course };
            return res.send(results);

        } else {
            results.success = false;
            results.data = "you Can not Assign course Score for this student";
            return res.send(results);
        }

    } catch (error) {
        console.log('error in assigning  course');
        results.success = false;
        results.data = "error in assigning  course";
        return res.send(results);
    }
}