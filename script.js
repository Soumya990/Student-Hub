const stdForm = document.getElementById('stdForm');
const stdData = document.getElementsByTagName('tbody')[0];

const submit = document.getElementById("submitBtn");
const change = document.getElementById("changeBtn");

let getRowIndex = 0;

    // creating a function that loads the data from our local storage and display it on our page everytime it is called
    // using dom manipulation we're creating new rows for each student containing details of the student in each cell and appending that row to our table already present on the webpage
    function loadFromLocal() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        stdData.innerHTML = '';
        students.forEach((student)=>{
            const row = document.createElement("tr");
            const cell1 = document.createElement("td");
            cell1.innerHTML = student.name;
            row.appendChild(cell1);

            const cell2 = document.createElement("td");
            cell2.innerHTML = student.id;
            row.appendChild(cell2);

            const cell3 = document.createElement("td");
            cell3.innerHTML = student.class;
            row.appendChild(cell3);

            const cell4 = document.createElement("td");
            cell4.innerHTML = student.email;
            row.appendChild(cell4);

            const cell5 = document.createElement("td");
            cell5.innerHTML = student.contact;
            row.appendChild(cell5);

            const cell6 = document.createElement("td");

            const ref = document.createElement("a");
            ref.href = "#header";
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.classList.add("editBtn");
            const edit = document.createElement("img");
            edit.src = "edit-button.png";
            edit.classList.add("editBtnImg");
            editBtn.appendChild(edit);
            ref.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.classList.add("deleteBtn");
            const trash = document.createElement("img");
            trash.src = "trash.png";
            trash.classList.add("deleteBtnImg");
            deleteBtn.appendChild(trash);

            cell6.appendChild(ref);
            cell6.appendChild(deleteBtn);

            row.appendChild(cell6);

            stdData.appendChild(row);
        })
    }

    stdForm.addEventListener('submit', saveToLocal);

    // using a function that is called whenever we're submitting our form
    // this function is used to store the form data to our local storage
    // it verifies whether our form contains any actual data or not and send the data to local storage
    function saveToLocal(event) {
        event.preventDefault();
        if(!checkIfEmpty()){
            const formData = new FormData(event.target);
            const student = {
                name: formData.get('stdName'),
                id: formData.get('stdId'),
                class: formData.get('stdClass'),
                email: formData.get('stdEmail'),
                contact: formData.get('contact')
            };
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students.push(student);
            localStorage.setItem('students', JSON.stringify(students));
            loadFromLocal();
        }
        stdForm.reset();
    }

    stdData.addEventListener("click", removeStudent);

    // removeStudent() removes any specific data from our local storage and renders the updated students table to our webpage
    function removeStudent(e) {
        const target = e.target;
        if(target.classList.contains('deleteBtn'))
        {
            const parent = target.parentElement;
            const index = parent.parentNode.rowIndex-1;
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            loadFromLocal();
        }
        else if(target.classList.contains('deleteBtnImg'))
        {
            const parent = target.parentElement;
            const index = parent.parentNode.parentElement.rowIndex-1;
            let students = JSON.parse(localStorage.getItem('students')) || [];
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            loadFromLocal();
        }
    }

    stdData.addEventListener("click", editStudent)

    // editStudent() function returns our form back to a previous state when we submitted any specific student details and provides us with a new button to change these details and save it 
    function editStudent(e) {
        const target = e.target;
        if(target.classList.contains('editBtn'))
        {
            const parent = target.parentElement;
            const index = parent.parentNode.parentNode.rowIndex-1;
            let students = JSON.parse(localStorage.getItem('students')) || [];
            const student = students[index];
            stdForm.elements['stdName'].value = student.name;
            stdForm.elements['stdId'].value = student.id;
            stdForm.elements['stdClass'].value = student.class;
            stdForm.elements['stdEmail'].value = student.email;
            stdForm.elements['contact'].value = student.contact;

            submit.style.display = 'none';
            change.style.display = 'block';

            getRowIndex = index;
        }
        else if(target.classList.contains('editBtnImg'))
        {
            const parent = target.parentElement;
            const index = parent.parentNode.parentNode.parentNode.rowIndex-1;
            let students = JSON.parse(localStorage.getItem('students')) || [];
            const student = students[index];
            stdForm.elements['stdName'].value = student.name;
            stdForm.elements['stdId'].value = student.id;
            stdForm.elements['stdClass'].value = student.class;
            stdForm.elements['stdEmail'].value = student.email;
            stdForm.elements['contact'].value = student.contact;

            submit.style.display = 'none';
            change.style.display = 'block';
            
            getRowIndex = index;
        }
    }

    change.addEventListener('click', updateData);

    // updateData() is called whenever we're trying to update an existing student detail
    // this function targets a specific student data, updates it's value in the local storage and returns the updated table and render it on our webpage using loadFromLocal()
    function updateData() {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students[getRowIndex];

        student.name = stdForm.elements['stdName'].value;
        student.id = stdForm.elements['stdId'].value;
        student.class = stdForm.elements['stdClass'].value;
        student.email = stdForm.elements['stdEmail'].value;
        student.contact = stdForm.elements['contact'].value;

        change.style.display = 'none';
        submit.style.display = 'block';
        stdForm.reset();

        localStorage.setItem('students', JSON.stringify(students));
        loadFromLocal();
    }

    // this function checks whether our form is completely empty or not and helps prevent null data from entering the table
    function checkIfEmpty() {
        if(stdName.value === '' && stdId.value === '' && stdClass.value === '' && stdEmail.value === '' && contact.value === '') {
            return true;
        } else {
            return false;
        }
    }

loadFromLocal();
