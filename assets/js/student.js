//Create Student .........

async function createStudent(e) {
    const URL = 'http://localhost:8394/students/create';
    e.preventDefault();

    var elements = document.getElementById("student-forms").elements;
    var formData = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        formData[item.name] = item.value;
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(formData)
        });
        console.log("response ", response);
        const jsonData = await response.json();
        const data = jsonData.data;
        if (jsonData.success) {

            appendStudentInTable(data.student);
            appendStudentInForm(data.student);

        } else {
            return;
        }
    } catch (error) {
        //console.log("error=", error);
        return;
    }

}

//new created student append in table tbody
function appendStudentInTable(data) {
    console.log("=======data========", data);
    let studentTableBody = document.getElementById(data.batch);

    let tr = document.createElement('tr');
    let studentID = document.createElement('td');
    let studentName = document.createElement('td');
    let studentCollege = document.createElement('td');
    let status = document.createElement('td');
    let actionBtn = document.createElement('td');

    tr.id = data._id;
    studentID.innerText = data.studentId;
    studentName.innerText = data.name;
    studentCollege.innerText = data.college;
    status.innerText = data.status;
    actionBtn.innerHTML = `<button onclick="viewStudentDetail('${data._id}')">View</button>
                            <button onclick="deleteStudents('${data._id}','${data.batch}')">Delete</button>`;
    tr.appendChild(studentID);
    tr.appendChild(studentName);
    tr.appendChild(studentCollege);
    tr.appendChild(status);
    tr.appendChild(actionBtn);
    studentTableBody.appendChild(tr);
}

//insert new created student in Form select option
function appendStudentInForm(student) {
    let optgroup = document.getElementById(student.batch + 'optgroup');
    let option = document.createElement('option');
    option.value = student._id;
    option.id = student._id + 'option';
    option.innerText = student.name;
    optgroup.appendChild(option);
}

//Delete the Students
async function deleteStudents(id, batchId) {
    //console.log(id);
    const URL = `http://localhost:8394/students/delete/${id}`;
    //e.preventDefault();

    try {
        const response = await fetch(URL, { method: 'DELETE' });
        const jsonData = await response.json();
        const message = jsonData.message;

        if (jsonData.success) {

            removeStudentFromTable(id, batchId);
            removeStudentInForm(id, batchId);
            console.log("====message========", message);
        } else {
            return;
        }
    } catch (error) {
        console.log("====message=error=======", error);
        return;
    }

}

//also delete Students from Table
function removeStudentFromTable(id, batchId) {
    let studentTableBody = document.getElementById(batchId);
    let removAbleRow = document.getElementById(id);
    let studentMoreDetailRow = document.getElementById(id + 'row');
    studentTableBody.removeChild(removAbleRow);
    studentTableBody.removeChild(studentMoreDetailRow);
    //return;
}


//Remove student name from Corse Score Form
function removeStudentInForm(studentId, batchId) {
    let optgroup = document.getElementById(batchId + 'optgroup');
    let removAbleOption = document.getElementById(studentId + 'option');
    optgroup.removeChild(removAbleOption);
}

//view more details of students
async function viewStudentDetail(studentId) {
    const URL = `http://localhost:8394/students/details/${studentId}`;
    try {
        const response = await fetch(URL);
        console.log("response ", response);
        const jsonData = await response.json();
        const data = jsonData.data;

        if (jsonData.success) {
            console.log("======= Students more details Successfully get=======", data.student);
            const student = data.student;
            if (student.course) {
                showCourseScore(student.course);
            } else {
                showCourseScore({ scoreDSA: "__", scoreWebD: "__", scoreReact: "__", student: student._id });
            }
            showInterviewList(student.interviewList, student._id);

        } else if (!jsonData.error) {
            console.log(jsonData.message);
        }

    } catch (error) {
        console.log("error=", error);
        return;
    }
}

function showCourseScore(course) {

    //let studentMoreDetailContainerRow = document.getElementById(course.student + 'row');
    let studentMoreDetailContainer = document.getElementById(course.student + 'details');

    let courseTable = document.createElement('table');
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');


    courseTable.className = "course-table";
    tHead.className = "course-head";
    tBody.className = "course-body";

    tHead.innerHTML = `<tr>
         <th>DSA Score</th>
         <th>WebD Score</th>
         <th>React Score</th>
         <th> Action</th>
      </tr>`

    tBody.innerHTML = `<tr>
             <td> <input id='${course._id+'DSA'}' class='editable'  placeholder="${course.scoreDSA}"/></td>
             <td> <input id='${course._id+'WebD'}' class='editable'  placeholder="${course.scoreWebD}"/></td>
             <td> <input id='${course._id+'React'}' class='editable' placeholder="${course.scoreReact}"/></td>
             <td><button  onclick="updateCourseScore(event,'${course._id}')">update</button></td>
             </tr>`;

    courseTable.appendChild(tHead);
    courseTable.appendChild(tBody);
    studentMoreDetailContainer.innerHTML = "";
    studentMoreDetailContainer.appendChild(courseTable);
    studentMoreDetailContainer.style = " display: table-cell;"
        // studentMoreDetailContainerRow.style = "display: table-row;"
}

function showInterviewList(interviewList, studentID) {

    let studentMoreDetailContainer = document.getElementById(studentID + 'details');

    let studentInterviewTable = document.createElement('table');
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');


    studentInterviewTable.className = "studentInterviews-table";
    tHead.className = "studentInterviews-head";
    tBody.className = "studentInterviews-body";

    tHead.innerHTML = `<tr>
        <!-- <th rowspan="2">Interview</th>-->
        <th colspan="2">Interview</th>
         <th colspan="4">Results</th>
         <th rowspan="2">Action</th>
      </tr>

      <tr>
         <th>company</th>
         <th>date</th>
         <th>pass</th>
         <th>fail</th>
         <th>onHold</th>
         <th>DoNot Attempt</th>
      </tr>`;

    for (let i = 0; i < interviewList.length; i++) {
        let results = interviewList[i].result;
        let interview = interviewList[i].interview;
        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${interview.company} </td>
        <td>${interview.date} </td>
        <td><input type="checkbox" id='${results._id +'pass'}' value='pass' ${results.pass?'checked':''}/></td>
        <td><input type="checkbox" id='${results._id +'fail'}' value='fail' ${results.fail?'checked':''}/></td>
        <td><input type="checkbox" id='${results._id +'onHold'}' value='onHold' ${results.onHold?'checked':''}/></td>
        <td><input type="checkbox" id='${results._id +'doNotAttempt'}' value='doNotAttempt'  ${results.doNotAttempt?'checked':''}/></td>
        <td><button onclick="updateResults(event,'${results._id}')">update</button></td>`;
        tBody.appendChild(tr);
    }


    studentInterviewTable.appendChild(tHead);
    studentInterviewTable.appendChild(tBody);
    // studentMoreDetailContainer.innerHTML = "";
    studentMoreDetailContainer.appendChild(studentInterviewTable);
    studentMoreDetailContainer.style = " display: table-cell;";

}

//
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.className == "more-details-container") {
        let rowId = target.id;
        console.log(rowId);
        document.getElementById(rowId).style = "display: none;";
    }
});

async function updateCourseScore(e, courseId) {
    const URL = `http://localhost:8394/courses/update/${courseId}`;
    //e.preventDefault();
    const target = e.target;
    target.innerText = "Upd....";
    target.style = "background-color:blue"

    let dsaInput = document.getElementById(courseId + 'DSA');
    let webDInput = document.getElementById(courseId + 'WebD');
    let reactInput = document.getElementById(courseId + 'React');

    const dsaMarks = dsaInput.value;
    const webDMarks = webDInput.value;
    const reactMarks = reactInput.value;
    const courseScore = {
            scoreDSA: dsaMarks,
            scoreWebD: webDMarks,
            scoreReact: reactMarks
        }
        // console.log(dsaMarks);
        // console.log(webDMarks);
        // console.log(reactMarks);

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(courseScore)
        });


        console.log("response ", response);
        const jsonData = await response.json();
        const data = jsonData.data;
        console.log("data=", data);
        if (jsonData.success) {
            target.innerText = "updated";
            target.style = "background-color:pink"

        } else {
            console.log(jsonData.message);
            target.innerText = "update";
            target.style = "background-color:gray"
            return;
        }
    } catch (error) {
        console.log("error=", error);
        return;
    }

}




// tHead.innerHTML = `<tr>
// <th>DSA Score</th>
// <th>WebD Score</th>
// <th>React Score</th>
//  <th>Action</th>
// </tr>`

// tBody.innerHTML = `<tr>
//     <td id='${course._id+'DSA'}' class='editable' >${course.scoreDSA}</td>
//     <td id='${course._id+'WebD'}' class='editable' >${course.scoreWebD}</td>
//     <td id='${course._id+'React'}' class='editable' >${course.scoreReact}</td>
//     <td><button  onclick="updateCourseScore(event,'${course._id}')">update</button></td>
//   </tr>`;