// =====================================================
// HOSPIONE - Hospital Management System
// Appointment JavaScript
// =====================================================

// IMPORTANT:
// Use your Railway backend URL here.
// Do NOT add /api/appointment at the end.
const API_BASE_URL = "https://hospione-production.up.railway.app";

// =====================================================
// LOAD PATIENTS
// =====================================================

async function loadPatients() {
    const patientSelect = document.getElementById("patient");

    if (!patientSelect) {
        console.error("Patient select element not found");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/patients`);

        if (!response.ok) {
            throw new Error(`Patient API error: ${response.status}`);
        }

        const patients = await response.json();

        patientSelect.innerHTML =
            '<option value="">Select Patient</option>';

        patients.forEach(patient => {
            const option = document.createElement("option");

            option.value = patient.id;

            option.textContent =
                patient.name ||
                patient.patientName ||
                `Patient ${patient.id}`;

            patientSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading patients:", error);
        alert("Unable to load patients.");
    }
}


// =====================================================
// LOAD DOCTORS
// =====================================================

async function loadDoctors() {
    const doctorSelect = document.getElementById("doctor");

    if (!doctorSelect) {
        console.error("Doctor select element not found");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/doctors`);

        if (!response.ok) {
            throw new Error(`Doctor API error: ${response.status}`);
        }

        const doctors = await response.json();

        doctorSelect.innerHTML =
            '<option value="">Select Doctor</option>';

        doctors.forEach(doctor => {
            const option = document.createElement("option");

            option.value = doctor.id;

            option.textContent =
                doctor.name ||
                doctor.doctorName ||
                `Doctor ${doctor.id}`;

            doctorSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading doctors:", error);
        alert("Unable to load doctors.");
    }
}


// =====================================================
// LOAD APPOINTMENTS
// =====================================================

async function loadAppointments() {

    const tableBody = document.getElementById("appointmentTableBody");

    if (!tableBody) {
        console.error("Appointment table body not found");
        return;
    }

    try {

        const response =
            await fetch(`${API_BASE_URL}/api/appointments`);

        if (!response.ok) {
            throw new Error(
                `Appointment API error: ${response.status}`
            );
        }

        const appointments = await response.json();

        tableBody.innerHTML = "";

        if (!appointments || appointments.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center;">
                        No appointments found
                    </td>
                </tr>
            `;

            return;
        }

        appointments.forEach(appointment => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${appointment.id ?? ""}</td>

                <td>
                    ${appointment.patient?.name ??
                    appointment.patientName ??
                    ""}
                </td>

                <td>
                    ${appointment.doctor?.name ??
                    appointment.doctorName ??
                    ""}
                </td>

                <td>${appointment.date ?? ""}</td>

                <td>${appointment.time ?? ""}</td>

                <td>${appointment.reason ?? ""}</td>

                <td>${appointment.status ?? ""}</td>

                <td>
                    <button
                        onclick="deleteAppointment(${appointment.id})">
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Unable to load appointments:",
            error
        );

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;color:red;">
                    Unable to load appointments
                </td>
            </tr>
        `;
    }
}


// =====================================================
// BOOK APPOINTMENT
// =====================================================

async function bookAppointment(event) {

    if (event) {
        event.preventDefault();
    }

    const patientElement =
        document.getElementById("patient");

    const doctorElement =
        document.getElementById("doctor");

    const dateElement =
        document.getElementById("date");

    const timeElement =
        document.getElementById("time");

    const reasonElement =
        document.getElementById("reason");

    const statusElement =
        document.getElementById("status");


    if (!patientElement ||
        !doctorElement ||
        !dateElement ||
        !timeElement ||
        !reasonElement ||
        !statusElement) {

        alert("Appointment form fields are missing.");
        return;
    }


    const patientId = patientElement.value;
    const doctorId = doctorElement.value;
    const date = dateElement.value;
    const time = timeElement.value;
    const reason = reasonElement.value;
    const status = statusElement.value;


    // Validate fields

    if (!patientId) {
        alert("Please select a patient.");
        return;
    }

    if (!doctorId) {
        alert("Please select a doctor.");
        return;
    }

    if (!date) {
        alert("Please select appointment date.");
        return;
    }

    if (!time) {
        alert("Please select appointment time.");
        return;
    }


    // Appointment data

    const appointmentData = {

        patient: {
            id: Number(patientId)
        },

        doctor: {
            id: Number(doctorId)
        },

        date: date,

        time: time,

        reason: reason,

        status: status

    };


    console.log(
        "Sending appointment:",
        appointmentData
    );


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/appointments`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(appointmentData)
            }
        );


        const resultText = await response.text();


        if (!response.ok) {

            console.error(
                "Booking failed:",
                resultText
            );

            alert(
                "Error booking appointment:\n" +
                resultText
            );

            return;
        }


        alert(
            "Appointment booked successfully!"
        );


        // Clear form

        patientElement.value = "";
        doctorElement.value = "";
        dateElement.value = "";
        timeElement.value = "";
        reasonElement.value = "";
        statusElement.value = "BOOKED";


        // Reload appointment list

        loadAppointments();

    } catch (error) {

        console.error(
            "Booking error:",
            error
        );

        alert(
            "Unable to connect to the Hospione server."
        );
    }
}


// =====================================================
// DELETE APPOINTMENT
// =====================================================

async function deleteAppointment(id) {

    if (!id) {
        return;
    }

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this appointment?"
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/appointments/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Delete failed:",
                errorText
            );

            alert(
                "Unable to delete appointment."
            );

            return;
        }


        alert(
            "Appointment deleted successfully!"
        );


        loadAppointments();

    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Unable to connect to server."
        );
    }
}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Hospione application started"
        );

        loadPatients();

        loadDoctors();

        loadAppointments();


        const appointmentForm =
            document.getElementById(
                "appointmentForm"
            );


        if (appointmentForm) {

            appointmentForm.addEventListener(
                "submit",
                bookAppointment
            );

        }

    }
);