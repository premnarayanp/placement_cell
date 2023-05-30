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
    actionBtn.innerHTML = `<button onclick="viewBatchStudents('${data._id}','${data._id}')">View</button>
                            <button onclick="deleteStudents('${data._id}','${data.batch}')">Delete</button>`;
    tr.appendChild(studentID);
    tr.appendChild(studentName);
    tr.appendChild(studentCollege);
    tr.appendChild(status);
    tr.appendChild(actionBtn);
    studentTableBody.appendChild(tr);
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
            console.log("====message========", message);
        } else {
            return;
        }
    } catch (error) {
        console.log("====message=error=======");
        return;
    }

}

//also delete Students from Table
function removeStudentFromTable(id, batchId) {
    let studentTableBody = document.getElementById(batchId);
    let removAbleRow = document.getElementById(id);
    studentTableBody.removeChild(removAbleRow);
    //return;
}