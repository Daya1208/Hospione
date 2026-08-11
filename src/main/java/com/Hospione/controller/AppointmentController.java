package com.Hospione.controller;

import com.Hospione.entity.Appointment;
import com.Hospione.entity.Doctor;
import com.Hospione.entity.Patient;
import com.Hospione.repository.AppointmentRepository;
import com.Hospione.repository.DoctorRepository;
import com.Hospione.repository.PatientRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentController(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository) {

        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }


    // GET ALL APPOINTMENTS

    @GetMapping
    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();

    }


    // GET APPOINTMENT BY ID

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable @NonNull Long id) {

        return appointmentRepository
                .findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // CREATE APPOINTMENT

    @PostMapping
    public ResponseEntity<?> createAppointment(
            @RequestBody Appointment appointment) {

        if (appointment.getPatient() == null ||
                appointment.getPatient().getId() == null) {

            return ResponseEntity.badRequest()
                    .body("Patient is required");
        }


        if (appointment.getDoctor() == null ||
                appointment.getDoctor().getId() == null) {

            return ResponseEntity.badRequest()
                    .body("Doctor is required");
        }


        Patient patient =
                patientRepository
                        .findById(
                                appointment
                                        .getPatient()
                                        .getId()
                        )
                        .orElse(null);


        if (patient == null) {

            return ResponseEntity.badRequest()
                    .body("Patient not found");
        }


        Doctor doctor =
                doctorRepository
                        .findById(
                                appointment
                                        .getDoctor()
                                        .getId()
                        )
                        .orElse(null);


        if (doctor == null) {

            return ResponseEntity.badRequest()
                    .body("Doctor not found");
        }


        appointment.setPatient(patient);

        appointment.setDoctor(doctor);


        if (appointment.getStatus() == null ||
                appointment.getStatus().isBlank()) {

            appointment.setStatus("BOOKED");
        }


        Appointment saved =
                appointmentRepository.save(appointment);


        return ResponseEntity.ok(saved);
    }


    // DELETE APPOINTMENT

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(
            @PathVariable Long id) {

        if (!appointmentRepository.existsById(id)) {

            return ResponseEntity.notFound().build();
        }


        appointmentRepository.deleteById(id);

        return ResponseEntity.ok(
                "Appointment deleted successfully"
        );
    }
}