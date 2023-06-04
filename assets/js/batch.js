//Create Batch,post req  as Batch
async function createBatch(e) {
    const URL = 'http://localhost:8394/batches/create';
    const input = document.getElementById("batchName");
    e.preventDefault();

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'name': `${input.value}`,
            })
        });
        // console.log("response ", response);

        const jsonData = await response.json();
        // console.log("json", jsonData);
        // console.log("json", jsonData.data);
        // console.log("json", jsonData.data.batch);

        const data = jsonData.data;
        console.log(data);
        if (jsonData.success) {
            appendBatchInTable({...data.batch, author: data.author });
        } else {
            return;
        }
    } catch (error) {
        //console.log("error=", error);
        return;
    }

}

//new created batch append in table tbody
function appendBatchInTable(data) {
    let batchTableBody = document.getElementById('batchTableBody');
    let tr = document.createElement('tr');
    let batchID = document.createElement('td');
    let batchName = document.createElement('td');
    let author = document.createElement('td');
    let studentNum = document.createElement('td');
    let actionBtn = document.createElement('td');

    tr.id = data._id + 'row';
    batchID.innerText = data.batchId;
    batchName.innerText = data.name;
    author.innerText = data.author;
    studentNum.innerText = data.students.length;
    //console.log("data.id=", data._id);
    actionBtn.innerHTML = `<button onclick="viewBatchStudents(event,'${data._id}')">View</button>
                            <button onclick="deleteBatch(event,'${data._id}')">Delete</button>`;

    tr.appendChild(batchID);
    tr.appendChild(batchName);
    tr.appendChild(author);
    tr.appendChild(studentNum);
    tr.appendChild(actionBtn);
    batchTableBody.appendChild(tr);
}

//Delete the batch
async function deleteBatch(e, id) {
    //console.log(id);
    const URL = `http://localhost:8394/batches/delete/${id}`;
    e.preventDefault();

    try {
        const response = await fetch(URL, { method: 'DELETE' });
        const jsonData = await response.json();
        const message = jsonData.message;

        if (jsonData.success) {
            removeBatchFromTable(id);
            console.log(jsonData.message);
        } else {
            console.log(jsonData.message);
            return;
        }
    } catch (error) {
        console.log(jsonData.message);
        return;
    }

}

//also delete batch from Table
function removeBatchFromTable(id) {
    let batchTableBody = document.getElementById('batchTableBody');
    let removAbleRow = document.getElementById(id + 'row');
    //  removAbleRow.innerHTML = "";
    batchTableBody.removeChild(removAbleRow);
    //return;
}