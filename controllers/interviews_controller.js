const Interview = require('../models/interview');
const Batch = require('../models/batch');
const Student = require('../models/student');
const Result = require('../models/result');

module.exports.interviews = async function(req, res) {

    try {
        const interview = await Interview.find({ user: req.user.id }); //.populate('user');
        const batches = await Batch.find({ user: req.user.id })
            .populate('user')
            .populate({
                path: 'students',
                populate: {
                    path: 'user'
                }
            });

        return res.render('interviews', {
            title: 'interviews',
            heading: 'this is interviews',
            interviews: interview,
            batches: batches
        });

    } catch (error) {
        console.log('error in finding interviews');

    }



}

module.exports.create = async function(req, res) {

    //console.log("======= req.body =========", req.body);
    const results = {};
    if (!req.body) {
        results.success = false;
        results.data = "Please fill Details";
        return res.send(results);
    }

    try {
        const interview = await Interview.findOne({ company: req.body.company });
        // console.log("=======before create interview=========", interview);
        if (!interview) {

            const interview = await Interview.create({
                company: req.body.company,
                date: req.body.date,
                user: req.user.id,
                numOfStudents: 0
            });

            // console.log("=======create interview=========", interview);


            results.success = true;
            results.data = { interview: interview };
            return res.send(results);

        }

    } catch (error) {
        console.log('error in finding interview');
        results.success = false;
        results.data = "error in finding/creating interview";
        return res.send(results);
    }
}


module.exports.assign = async function(req, res) {

    // console.log("======= req.body =========", req.body);
    const results = {};
    if (!req.body) {
        results.success = false;
        results.data = "Please fill Details";
        return res.send(results);
    }

    try {
        const interview = await Interview.findById(req.body.interview);
        const student = await Student.findById(req.body.student);
        //console.log("=======before assign interview=========", interview);
        //console.log("=======before assign students=========", student);

        if (interview && student) {
            // console.log("======students and interview Exist=========");
            //interview.assignedStudentList.filter((data)=>data.student==student._id);

            let data = null;
            for (index in interview.assignedStudentList) {
                let dataItem = interview.assignedStudentList[index];
                //  console.log("========dataItem======", dataItem.student, "==", student._id);
                if (dataItem.student == student.id) {
                    data = dataItem;
                    //console.log("################################", dataItem);
                    break;
                }
            }

            //console.log("========Data======", data);

            if (!data) {
                //console.log("=======creation done======");
                const result = await Result.create({
                    pass: false,
                    fail: false,
                    onHold: true,
                    doNotAttempt: false,
                    student: student._id,
                    interview: interview._id,
                    user: req.user.id
                });

                // console.log("========Result======", result);

                interview.assignedStudentList.push({
                    student: student._id,
                    result: result._id
                });
                interview.numOfStudents = interview.numOfStudents + 1;

                student.interviewList.push({
                    interview: interview._id,
                    result: result._id,
                });

                interview.save();
                student.save();

                results.success = true;
                results.data = { interview: interview };
                return res.send(results);

            } else {
                results.success = false;
                results.data = " Student Already Assigned for this interview";
                return res.send(results);
            }

        } else {
            results.success = false;
            results.data = " this Student /interview not exist";
            return res.send(results);
        }

    } catch (error) {
        console.log('error in finding interview');
        results.success = false;
        results.data = "error in finding/creating interview";
        return res.send(results);
    }
}

module.exports.details = async function(req, res) {
    try {

        console.log("=========req.params.id============", req.params.id);
        const interview = await Interview.findById(req.params.id)
            .populate({
                path: 'assignedStudentList',
                populate: [{
                    path: 'student',
                    model: 'Student'
                }, {
                    path: 'result',
                    model: 'Result'
                }]
            })


        if (interview) {
            return res.send({ success: true, data: { interview: interview }, message: "Successfully students and results founded" });
        } else {
            return res.send({ success: false, message: "Not Found any results and interview", error: false });
        }

    } catch (error) {
        console.log('error in finding results and students');
        return res.send({ success: false, message: "error in finding results and students", error: true });
    }

}