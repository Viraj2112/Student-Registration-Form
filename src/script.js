// First Creating a JS Function to get hold of each form element :-
function saveForm() {
    const name = document.querySelector("#name").value.trim();
    const id = document.querySelector("#student_id").value.trim();
    const student_class = document.querySelector("#student_class").value.trim();
    const gender = document.querySelector("#gender").value;
    const dob = document.querySelector("#dob").value;
    const email = document.querySelector("#email").value.trim();
    const contact = document.querySelector("#contact").value.trim();

    // Creating an object to save all the Form elements:-
    const student = {name, id, student_class, gender, dob, email, contact};

    // Getting hold of the saved forms in local storage or instead empty list :-
    // here JSON.parse is used to convert the string stored in localStorage into object.
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Pushing the submitted form inside the students array :-
    students.push(student);

    // Saving the New students list inside localStorage:-
    localStorage.setItem("students", JSON.stringify(students));

    // Generating message for the user:-
    alert("Registration Successful.");

    // Calling the Display Submitted Forms Function:-
    displaySubmittedForms();

    //Reset the form
    document.querySelector("#registration-form").reset();

    return false;
}

function displaySubmittedForms() {
    // getting hold of the body tag :-
    const tableBody = document.getElementById("savedFormsBody");

    // Clearing Table body:-
    tableBody.innerHTML = "";

    // Getting hold of the saved forms in local storage or instead empty list :
    const students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach((student, index) => {
        const row = tableBody.insertRow();

        const cell1 = row.insertCell(0);
        cell1.textContent = student.name;

        const cell2 = row.insertCell(1);
        cell2.textContent = student.id;

        const cell3 = row.insertCell(2);
        cell3.textContent = student.student_class;

        const cell4 = row.insertCell(3);
        cell4.textContent = student.gender;

        const cell5 = row.insertCell(4);
        cell5.textContent = student.dob;

        const cell6 = row.insertCell(5);
        cell6.textContent = student.email; 

        const cell7 = row.insertCell(6);
        cell7.textContent = student.contact; 

        const cell8 = row.insertCell(7);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add('text-red-400', 'font-semibold', 'px-2','rounded', 'hover:bg-blue-600', 'mx-auto');
        deleteButton.onclick = () => deleteStudent(index);
        cell8.appendChild(deleteButton);

        const cell9 = row.insertCell(8);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit"
        editButton.classList.add('text-slate-400', 'font-semibold', 'px-2','rounded', 'hover:bg-blue-600', 'mx-auto');
        editButton.onclick = () => editEntry(index); 
        cell9.appendChild(editButton);

    });
}

function editEntry(index) {
    const students = JSON.parse(localStorage.getItem("students"))
    const studentToEdit = students.at(index);

    document.querySelector("#name").value = studentToEdit.name;
    document.querySelector("#student_id").value = studentToEdit.id;
    document.querySelector("#student_class").value = studentToEdit.student_class;
    document.querySelector("#gender").value = studentToEdit.gender;
    document.querySelector("#dob").value = studentToEdit.dob;
    document.querySelector("#email").value = studentToEdit.email;
    document.querySelector("#contact").value = studentToEdit.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    // Retrieve the existing students from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Remove the student at the specified index
    students.splice(index, 1);

    // Save the updated students array back to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Refresh the displayed forms
    displaySubmittedForms();
}


// Display Saved Form on page load:-
window.onload = displaySubmittedForms;
