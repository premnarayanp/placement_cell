const LastIndexCounter = require("../models/lastIndexCounter");
const Batch = require('../models/batch');
const Student = require('../models/student');
const Course = require('../models/course');
const Result = require('../models/result');
const Interview = require('../models/interview');

//create Students

//find all students according batchWise
module.exports.students = async function(req, res) {

    try {

        const batches = await Batch.find({ user: req.user.id })
            .populate('user')
            .populate({
                path: 'students',
                populate: {
                    path: 'user'
                }
            });

        return res.render('students', {
            title: 'Students',
            batches: batches
        });

    } catch (error) {
        console.log('error in finding students');

    }


}

module.exports.create = async function(req, res) {
    const results = {};
    if (!req.body) {
        results.success = false;
        results.data = "Please fill Details";
        return res.send(results);
    }
    // console.log(req.body);

    try {
        const batch = await Batch.findById(req.body.batch);
        if (batch) {

            const lastIndexCounter = await LastIndexCounter.findOne({});
            if (lastIndexCounter == null) {
                results.data = "!Nothing  Batch,Please first create Students Batch..";
                return res.send(results);
            }
            const counter = lastIndexCounter.lastIndexOfStudents + 1;
            const batchId = batch.batchId;
            const studentId = batchId + counter.toString();

            const student = await Student.create({
                studentId: studentId,
                name: req.body.name,
                college: req.body.college,
                status: "Not Placed",
                user: req.user.id,
                batch: req.body.batch
            });

            //console.log("=======create student=========", student);

            lastIndexCounter.lastIndexOfStudents = lastIndexCounter.lastIndexOfStudents + 1;
            lastIndexCounter.save();

            batch.students.push(student);
            batch.studentsCount = batch.studentsCount + 1;
            batch.save();

            results.success = true;
            results.data = { student: student };
            return res.send(results);

        }

    } catch (error) {
        console.log('error in finding student');
        results.success = false;
        results.data = "error in finding/creating student";
        return res.send(results);
    }
}

//delete students
module.exports.delete = async function(req, res) {
    //console.log(req.params.id);
    //console.log("========req.params.id============", req.params.id);

    try {
        let student = await Student.findById(req.params.id);
        //console.log("===============student====================", student);

        if (student && student.user == req.user.id) {
            let batchId = student.batch;
            let courseScoreId = student.course;

            //remove student
            await Student.findByIdAndRemove(req.params.id);

            //remove course marks
            await Course.findByIdAndRemove(courseScoreId);

            //remove  students all interview results 
            //await Result.deleteMany({ student: req.params.id });

            //remove student from batch,s students array
            let batch = await Batch.findByIdAndUpdate(batchId, {
                $pull: { students: req.params.id },
            });

            batch.studentsCount = batch.studentsCount - 1;
            batch.save();
            return res.send({ success: true, message: "Student Deleted Successfully" });

        } else {
            return res.send({ success: false, message: "You can not delate this Student" });
        }

    } catch (error) {
        console.log('error in deleting a comments', error);
        return res.send({ success: false, message: "Error while deleting this Student" });
    }

}


module.exports.details = async function(req, res) {
    try {

        console.log("=========req.params.id============", req.params.id);
        const student = await Student.findById(req.params.id)
            .populate('course')
            .populate({
                path: 'interviewList',
                populate: [{
                    path: 'interview',
                    model: 'Interview'
                }, {
                    path: 'result',
                    model: 'Result'
                }]
            })

        // const student = await Student.findById(req.params.id)
        if (student) {
            return res.send({ success: true, data: { student: student }, message: "Successfully detail founded" });
        } else {
            return res.send({ success: false, message: "Not found more details", error: false });
        }

    } catch (error) {
        console.log('error in finding students');
        return res.send({ success: false, message: "Error to find this course", error: true });
    }

}


// module.exports.details = async function(req, res) {
//     try {

//         console.log("=========req.params.id============", req.params.id);
//         // const student = await Student.findById(req.params.id)
//         //     .populate('user')
//         //     .populate({
//         //         path: 'students',
//         //         populate: {
//         //             path: 'user'
//         //         }
//         //     });

//         const course = await Course.findOne({ student: req.params.id })
//         if (course) {
//             return res.send({ success: true, data: { course: course }, message: "Successfully detail founded" });
//         } else {
//             return res.send({ success: false, message: "Not Assign Course Score", error: false });
//         }

//     } catch (error) {
//         console.log('error in finding students');
//         return res.send({ success: false, message: "Error to find this course", error: true });
//     }

// }