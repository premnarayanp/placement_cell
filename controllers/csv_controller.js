const Student = require('../models/student');

module.exports.loadCsv = async(req, res) => {

    const createCsvWriter = require('csv-writer').createArrayCsvWriter;
    const csvWriter = createCsvWriter({
        header: ['Student id', 'Student Name', 'Student College', 'Student Status', 'DSA Score', 'WebD Score', 'React Score', 'Interview Date', 'Interview Company', 'Interview Result'],
        path: 'file.csv'
    });

    const students = await loadDataFromDb(req, res);
    console.log(students);
    // if (students) {
    //     res.send(students);
    // }
    const records = [];
    for (let i = 0; i < students.length; i++) {
        let data = students[i];
        let course = data.course;
        let interviewList = data.interviewList;
        let interviews = interviewList[0]
        let interview = interviews ? interviews.interview : null;
        let result = interviews ? interviews.result : null;

        console.log("=====================================================");
        records.push([
            data.studentId,
            data.name,
            data.college,
            data.status,
            course ? course.scoreDSA : "No Marks",
            course ? course.scoreWebD : "No Marks",
            course ? course.scoreReact : "No Marks",
            interview ? interview.date : "--/--/--",
            interview ? interview.company : "Nothing",
            result ? result.finalResult : "onHold",
        ]);
    }

    csvWriter.writeRecords(records) // returns a promise
        .then(() => {
            console.log('...Done');
            // res.setHeader('Content-disposition', 'attachment; filename=file.csv');
            // res.set('Content-Type', 'text/csv');
            // res.status(200).send('file.csv');
            res.download('file.csv');
        });

}
async function loadDataFromDb(req, res) {
    try {

        const students = await Student.find({ user: req.user.id }).populate('course')
            .populate({
                path: 'interviewList',
                populate: [{
                    path: 'interview',
                    model: 'Interview'
                }, {
                    path: 'result',
                    model: 'Result'
                }]
            });
        return students;

    } catch (error) {
        console.log("error", error);
    }

}