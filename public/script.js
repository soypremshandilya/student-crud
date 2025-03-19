document.addEventListener("DOMContentLoaded", fetchStudents);
const studentForm = document.getElementById("student-form");

async function fetchStudents() {
  const res = await fetch("/students");
  const students = await res.json();
  const studentList = document.getElementById("student-list");

  studentList.innerHTML = "";
  students.forEach((student) => {
    studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>
                    <button onclick="editStudent('${student._id}', '${student.name}', '${student.email}', '${student.age}')">Update</button>
                    <button onclick="deleteStudent('${student._id}')">Delete</button>
                </td>
            </tr>
        `;
  });
}

async function addOrUpdateStudent(event) {
  event.preventDefault();

  const studentId = document.getElementById("student-id").value;
  const studentData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
  };

  if (studentId) {
    await fetch(`/students/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
  } else {
    await fetch("/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
  }

  studentForm.reset();
  document.getElementById("student-id").value = "";
  fetchStudents();
}

function editStudent(id, name, email, age) {
  document.getElementById("student-id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("age").value = age;
}

async function deleteStudent(id) {
  await fetch(`/students/${id}`, { method: "DELETE" });
  fetchStudents();
}

studentForm.addEventListener("submit", addOrUpdateStudent);
