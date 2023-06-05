//const BASE_URL = 'http://localhost:8394';
//add corse score of students
async function submitCourseScore(e) {
    const URL = BASE_URL + '/courses/create';
    e.preventDefault();

    var elements = document.getElementById("course-forms").elements;
    var formData = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        formData[item.name] = item.value;
    }

    console.log("==========Form Data================", formData);
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

            // appendStudentInTable(data.student);
            console.log("======= courses Successfully submitted=======", data);
        } else {
            console.log("=======You can not assign course score for this students=======", data);
            return;
        }
    } catch (error) {
        console.log("error=", error);
        return;
    }

}