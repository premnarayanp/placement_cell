//create interview 
async function createInterview(e) {
    const URL = 'http://localhost:8394/interviews/create';
    e.preventDefault();

    var elements = document.getElementById("interview-form").elements;
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
        console.log("data=", data);
        if (jsonData.success) {

            appendInterviewInTable(data.interview);
            appendInterviewInForm(data.interview);

        } else {
            return;
        }
    } catch (error) {
        //console.log("error=", error);
        return;
    }

}
//Append  interview in table
function appendInterviewInTable(interview) {
    console.log("=======interview========", interview);
    let interviewTableBody = document.getElementById('interviewTableBody');

    let tr = document.createElement('tr');
    let company = document.createElement('td');
    let date = document.createElement('td');
    let numOfStudents = document.createElement('td');
    // let actionBtn = document.createElement('td');

    tr.id = interview._id;
    company.innerText = interview.company;
    date.innerText = interview.date;
    numOfStudents.innerText = interview.numOfStudents;
    numOfStudents.id = interview._id + 'stuNum';
    // actionBtn.innerHTML = `<button onclick="viewAssignedStudents('${interview._id}')">View</button>
    //                         <button onclick="deleteInterview('${interview._id}')">Delete</button>`;
    tr.appendChild(company);
    tr.appendChild(date);
    tr.appendChild(numOfStudents);
    // tr.appendChild(actionBtn);
    interviewTableBody.appendChild(tr);
}

//insert new created interview in Form select option
function appendInterviewInForm(interview) {
    let interview_selector = document.getElementById('interview-selector');
    let option = document.createElement('option');
    option.value = interview._id;
    option.id = interview._id + 'option';
    option.innerText = interview.company;
    interview_selector.appendChild(option);
}


//Assign interview to students
async function assignInterviewToStudents(e) {
    const URL = 'http://localhost:8394/interviews/assign';
    e.preventDefault();

    var elements = document.getElementById("interview-initializer").elements;
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
        console.log("Assigned=", data);
        const interview = data.interview;
        if (jsonData.success) {
            let numOfStudents = document.getElementById(interview._id + 'stuNum');
            console.log(numOfStudents);
            numOfStudents.innerText = interview.numOfStudents;
        } else {
            return;
        }
    } catch (error) {
        console.log("error=", error);
        return;
    }
}



//get assigned students of interview
async function viewAssignedStudents(interviewId) {
    const URL = `http://localhost:8394/interviews/details/${interviewId}`;
    try {
        const response = await fetch(URL);
        console.log("response ", response);
        const jsonData = await response.json();
        const data = jsonData.data;

        if (jsonData.success) {
            console.log("======= Students more details Successfully get=======", data);
            showAssignedStudents(data.interview);
        } else {
            //console.log(jsonData.message);
        }
    } catch (error) {
        console.log("error=", error);
        return;
    }
}

function showAssignedStudents(interview) {
    let studentsList = interview.assignedStudentList;
    let interviewId = interview._id;

    let interviewMoreDetailContainer = document.getElementById(interviewId + 'details');
    let assignStudentTable = document.createElement('table');
    let tHead = document.createElement('thead');
    let tBody = document.createElement('tbody');

    assignStudentTable.className = "assignStudent-table";
    tHead.className = "assignStudent-head";
    tBody.className = "assignStudent-body";

    tHead.innerHTML = `<tr>
         <th rowspan="2">Students</th>
         <th colspan="4">Results</th>
         <th rowspan="2">Action</th>
      </tr>

      <tr>
         <th>pass</th>
         <th>fail</th>
         <th>onHold</th>
         <th>DoNot Attempt</th>
      </tr>`;

    for (let i = 0; i < studentsList.length; i++) {
        let results = studentsList[i].result;
        let student = studentsList[i].student;
        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${student.name} </td>
        <td><input type="checkbox" id='${results._id +'pass'}'  value='pass'  ${results.pass?'checked':''}/></td>
        <td><input type="checkbox" id='${results._id +'fail'}'  value='fail'       ${results.fail?'checked':''}/></td>
        <td><input type="checkbox" id='${results._id +'onHold'}' value='onHold'     ${results.onHold?'checked':''}/></td>
        <td><input type="checkbox" id='${results._id +'doNotAttempt'}' value='doNotAttempt' ${results.doNotAttempt?'checked':''}/></td>
        <td><button onclick="updateResults(event,'${results._id}')">update</button></td>`;
        tBody.appendChild(tr);
    }


    assignStudentTable.appendChild(tHead);
    assignStudentTable.appendChild(tBody);
    interviewMoreDetailContainer.innerHTML = "";
    interviewMoreDetailContainer.appendChild(assignStudentTable);
    interviewMoreDetailContainer.style = " display: table-cell;";
}



async function updateResults(e, resultsId) {
    const URL = `http://localhost:8394/results/update/${resultsId}`;
    //e.preventDefault();
    const target = e.target;
    // e.target.innerText = "up....";
    target.innerText = "Upd.....";
    target.style = "background-color:blue"

    let pass = document.getElementById(resultsId + 'pass').checked;
    let fail = document.getElementById(resultsId + 'fail').checked;
    let onHold = document.getElementById(resultsId + 'onHold').checked;
    let doNotAttempt = document.getElementById(resultsId + 'doNotAttempt').checked;


    let finalResult = 'onHold';
    if (pass) {
        finalResult = 'pass';
    } else if (fail) {
        finalResult = 'fail';
    } else if (doNotAttempt) {
        finalResult = 'doNotAttempt';
    }

    // console.log("pass=", pass.checked);
    // console.log("fail=", fail.checked);
    // console.log("onHold=", onHold.checked);
    // console.log("doNotAttempt=", doNotAttempt.checked);

    const results = {
        pass: pass,
        fail: fail,
        onHold: onHold,
        doNotAttempt: doNotAttempt,
        finalResult: finalResult
    };

    console.log("Data==", results);
    //console.log("URL incoded==", new URLSearchParams(results));
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(results)
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

// //Delete the interview
// async function deleteInterview(id) {
//     //console.log(id);
//     const URL = `http://localhost:8394/interviews/delete/${id}`;
//     //e.preventDefault();

//     try {
//         const response = await fetch(URL, { method: 'DELETE' });
//         const jsonData = await response.json();
//         const message = jsonData.message;

//         if (jsonData.success) {
//             removeInterviewFromTable(id);
//             removeInterviewInForm(id);
//             console.log("====message========", message);
//         } else {
//             return;
//         }
//     } catch (error) {
//         console.log("====message=error=======");
//         return;
//     }

// }

// //also delete Interview from Table
// function removeInterviewFromTable(id) {
//     let interviewTableBody = document.getElementById('interviewTableBody');
//     let removAbleRow = document.getElementById(id);
//     interviewTableBody.removeChild(removAbleRow);
//     //return;
// }


// //Remove interview name from Interview  Form
// function removeInterviewInForm(interviewId) {
//     let select = document.getElementById('interview-selector');
//     let removAbleOption = document.getElementById(interviewId + 'option');
//     select.removeChild(removAbleOption);
// }