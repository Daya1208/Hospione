const API_URL = "/api";


// ===============================
// PAGE NAVIGATION
// ===============================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.add("hidden");
    });

    document
        .getElementById(pageId)
        .classList.remove("hidden");


    if (pageId === "patients") {
        loadPatients();
    }


    if (pageId === "doctors") {

        loadDoctors();

        loadDepartmentOptions();

    }


    if (pageId === "departments") {
        loadDepartments();
    }

    if (pageId === "appointments") {

    loadAppointments();

    loadAppointmentPatients();

    loadAppointmentDoctors();

}


    if (pageId === "dashboard") {
        loadDashboard();
    }

}

// ===============================
// LOAD DASHBOARD
// ===============================

async function loadDashboard() {

    try {

        const patients =
            await fetch(`${API_URL}/patients`)
                .then(response => response.json());


        const doctors =
            await fetch(`${API_URL}/doctors`)
                .then(response => response.json());


        const departments =
            await fetch(`${API_URL}/departments`)
                .then(response => response.json());


        const appointments =
            await fetch(`${API_URL}/appointments`)
                .then(response => response.json());


        document.getElementById("patientCount")
            .textContent = patients.length;


        document.getElementById("doctorCount")
            .textContent = doctors.length;


        document.getElementById("departmentCount")
            .textContent = departments.length;


        document.getElementById("appointmentCount")
            .textContent = appointments.length;


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }
}


// ===============================
// LOAD PATIENTS
// ===============================

async function loadPatients() {

    try {

        const response =
            await fetch(`${API_URL}/patients`);


        const patients =
            await response.json();


        const table =
            document.getElementById("patientTable");


        table.innerHTML = "";


        patients.forEach(patient => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${patient.id}</td>

                <td>${patient.name}</td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${patient.email || ""}</td>

                <td>${patient.phone}</td>

                <td>${patient.bloodGroup || ""}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deletePatient(${patient.id})">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Patient Loading Error:",
            error
        );

    }

}


// ===============================
// ADD PATIENT
// ===============================

document
    .getElementById("patientForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const patient = {

            name:
                document
                    .getElementById("patientName")
                    .value,

            age:
                Number(
                    document
                        .getElementById("patientAge")
                        .value
                ),

            gender:
                document
                    .getElementById("patientGender")
                    .value,

            email:
                document
                    .getElementById("patientEmail")
                    .value,

            phone:
                document
                    .getElementById("patientPhone")
                    .value,

            address:
                document
                    .getElementById("patientAddress")
                    .value,

            bloodGroup:
                document
                    .getElementById("patientBloodGroup")
                    .value

        };


        try {

            const response =
                await fetch(`${API_URL}/patients`, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(patient)

                });


            if (!response.ok) {

                throw new Error(
                    "Failed to add patient"
                );

            }


            alert(
                "Patient added successfully!"
            );


            document
                .getElementById("patientForm")
                .reset();


            loadPatients();


            loadDashboard();


        } catch (error) {

            console.error(error);

            alert(
                "Error adding patient"
            );

        }

    });


// ===============================
// DELETE PATIENT
// ===============================

async function deletePatient(id) {

    if (!confirm(
        "Are you sure you want to delete this patient?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/patients/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Patient deleted successfully!"
        );


        loadPatients();

        loadDashboard();


    } catch (error) {

        console.error(error);

        alert(
            "Error deleting patient"
        );

    }

}


// ===============================
// INITIAL LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadDashboard();

    }
);
// ======================================
// DEPARTMENTS
// ======================================

async function loadDepartments() {

    try {

        const response =
            await fetch(`${API_URL}/departments`);

        const departments =
            await response.json();

        const table =
            document.getElementById("departmentTable");

        table.innerHTML = "";


        departments.forEach(department => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${department.id}</td>

                <td>${department.name}</td>

                <td>${department.description || ""}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteDepartment(${department.id})">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Department loading error:",
            error
        );

    }

}
// ======================================
// ADD DEPARTMENT
// ======================================

document
    .getElementById("departmentForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const department = {

            name:
                document
                    .getElementById("departmentName")
                    .value,

            description:
                document
                    .getElementById("departmentDescription")
                    .value

        };


        try {

            const response =
                await fetch(
                    `${API_URL}/departments`,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(department)

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Department creation failed"
                );

            }


            alert(
                "Department added successfully!"
            );


            document
                .getElementById("departmentForm")
                .reset();


            loadDepartments();

            loadDashboard();


        } catch (error) {

            console.error(error);

            alert(
                "Error adding department"
            );

        }

    });
    // ======================================
// DELETE DEPARTMENT
// ======================================

async function deleteDepartment(id) {

    if (!confirm(
        "Are you sure you want to delete this department?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/departments/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Department deleted successfully!"
        );


        loadDepartments();

        loadDashboard();


    } catch (error) {

        console.error(error);

        alert(
            "Error deleting department"
        );

    }

}
// ======================================
// DEPARTMENT DROPDOWN
// ======================================

async function loadDepartmentOptions() {

    try {

        const response =
            await fetch(`${API_URL}/departments`);

        const departments =
            await response.json();


        const select =
            document.getElementById(
                "doctorDepartment"
            );


        select.innerHTML = `
            <option value="">
                Select Department
            </option>
        `;


        departments.forEach(department => {

            const option =
                document.createElement("option");


            option.value =
                department.id;


            option.textContent =
                department.name;


            select.appendChild(option);

        });


    } catch (error) {

        console.error(
            "Department dropdown error:",
            error
        );

    }

}
// ======================================
// DOCTORS
// ======================================

async function loadDoctors() {

    try {

        const response =
            await fetch(`${API_URL}/doctors`);

        const doctors =
            await response.json();


        const table =
            document.getElementById(
                "doctorTable"
            );


        table.innerHTML = "";


        doctors.forEach(doctor => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${doctor.id}</td>

                <td>${doctor.name}</td>

                <td>${doctor.email}</td>

                <td>${doctor.phone}</td>

                <td>${doctor.specialization}</td>

                <td>${doctor.qualification}</td>

                <td>
                    ${
                        doctor.department
                            ? doctor.department.name
                            : ""
                    }
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteDoctor(${doctor.id})">

                        Delete

                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Doctor loading error:",
            error
        );

    }

}
// ======================================
// ADD DOCTOR
// ======================================

document
    .getElementById("doctorForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const departmentId =
            document
                .getElementById("doctorDepartment")
                .value;


        const doctor = {

            name:
                document
                    .getElementById("doctorName")
                    .value,

            email:
                document
                    .getElementById("doctorEmail")
                    .value,

            phone:
                document
                    .getElementById("doctorPhone")
                    .value,

            specialization:
                document
                    .getElementById(
                        "doctorSpecialization"
                    )
                    .value,

            qualification:
                document
                    .getElementById(
                        "doctorQualification"
                    )
                    .value,

            department: {

                id:
                    Number(departmentId)

            }

        };


        try {

            const response =
                await fetch(
                    `${API_URL}/doctors`,
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(doctor)

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Doctor creation failed"
                );

            }


            alert(
                "Doctor added successfully!"
            );


            document
                .getElementById("doctorForm")
                .reset();


            loadDoctors();

            loadDashboard();


        } catch (error) {

            console.error(error);

            alert(
                "Error adding doctor"
            );

        }

    });
    // ======================================
// DELETE DOCTOR
// ======================================

async function deleteDoctor(id) {

    if (!confirm(
        "Are you sure you want to delete this doctor?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/doctors/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Doctor deleted successfully!"
        );


        loadDoctors();

        loadDashboard();


    } catch (error) {

        console.error(error);

        alert(
            "Error deleting doctor"
        );

    }

}
// ======================================
// APPOINTMENT PATIENT DROPDOWN
// ======================================

async function loadAppointmentPatients() {

    try {

        const response =
            await fetch(`${API_URL}/patients`);

        const patients =
            await response.json();


        const select =
            document.getElementById(
                "appointmentPatient"
            );


        select.innerHTML = `
            <option value="">
                Select Patient
            </option>
        `;


        patients.forEach(patient => {

            const option =
                document.createElement("option");


            option.value =
                patient.id;


            option.textContent =
                `${patient.name} - ${patient.phone}`;


            select.appendChild(option);

        });


    } catch (error) {

        console.error(
            "Patient dropdown error:",
            error
        );

    }

}
// ======================================
// APPOINTMENT DOCTOR DROPDOWN
// ======================================

async function loadAppointmentDoctors() {

    try {

        const response =
            await fetch(`${API_URL}/doctors`);

        const doctors =
            await response.json();


        const select =
            document.getElementById(
                "appointmentDoctor"
            );


        select.innerHTML = `
            <option value="">
                Select Doctor
            </option>
        `;


        doctors.forEach(doctor => {

            const option =
                document.createElement("option");


            option.value =
                doctor.id;


            option.textContent =
                `${doctor.name} - ${doctor.specialization}`;


            select.appendChild(option);

        });


    } catch (error) {

        console.error(
            "Doctor dropdown error:",
            error
        );

    }

}
// ======================================
// LOAD APPOINTMENTS
// ======================================

async function loadAppointments() {

    try {

        const response =
            await fetch(`${API_URL}/appointments`);


        const appointments =
            await response.json();


        const table =
            document.getElementById(
                "appointmentTable"
            );


        table.innerHTML = "";


        appointments.forEach(appointment => {

            const row =
                document.createElement("tr");


            const patientName =
                appointment.patient
                    ? appointment.patient.name
                    : "";


            const doctorName =
                appointment.doctor
                    ? appointment.doctor.name
                    : "";


            row.innerHTML = `

                <td>
                    ${appointment.id}
                </td>

                <td>
                    ${patientName}
                </td>

                <td>
                    ${doctorName}
                </td>

                <td>
                    ${appointment.appointmentDate}
                </td>

                <td>
                    ${appointment.appointmentTime}
                </td>

                <td>
                    ${appointment.reason}
                </td>

                <td>
                    ${appointment.status}
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="
                            deleteAppointment(
                                ${appointment.id}
                            )
                        "
                    >
                        Delete
                    </button>

                </td>

            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(
            "Appointment loading error:",
            error
        );

    }

}
// ======================================
// BOOK APPOINTMENT
// ======================================

document
    .getElementById("appointmentForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const patientId =
                document
                    .getElementById(
                        "appointmentPatient"
                    )
                    .value;


            const doctorId =
                document
                    .getElementById(
                        "appointmentDoctor"
                    )
                    .value;


            const appointment = {

                patient: {

                    id:
                        Number(patientId)

                },

                doctor: {

                    id:
                        Number(doctorId)

                },

                appointmentDate:
                    document
                        .getElementById(
                            "appointmentDate"
                        )
                        .value,

                appointmentTime:
                    document
                        .getElementById(
                            "appointmentTime"
                        )
                        .value,

                reason:
                    document
                        .getElementById(
                            "appointmentReason"
                        )
                        .value,

                status:
                    document
                        .getElementById(
                            "appointmentStatus"
                        )
                        .value

            };


            try {

                const response =
                    await fetch("/api/appointment", 
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    appointment
                                )

                        }
                    );


                if (!response.ok) {

                    const errorText =
                        await response.text();

                    throw new Error(
                        errorText
                    );

                }


                alert(
                    "Appointment booked successfully!"
                );


                document
                    .getElementById(
                        "appointmentForm"
                    )
                    .reset();


                loadAppointments();

                loadDashboard();


            } catch (error) {

                console.error(error);


                alert(
                    "Error booking appointment: "
                    + error.message
                );

            }

        }
    );
    // ======================================
// DELETE APPOINTMENT
// ======================================

async function deleteAppointment(id) {

    if (!confirm(
        "Are you sure you want to delete this appointment?"
    )) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/appointments/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Appointment deleted successfully!"
        );


        loadAppointments();

        loadDashboard();


    } catch (error) {

        console.error(error);


        alert(
            "Error deleting appointment"
        );

    }

}