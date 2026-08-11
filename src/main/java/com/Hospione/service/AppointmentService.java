package com.Hospione.service;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.Hospione.entity.Appointment;
import com.Hospione.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(@NonNull Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment createAppointment(@NonNull Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(@NonNull Long id,
                                         Appointment appointment) {

        Appointment existing = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Appointment not found"));

        existing.setAppointmentDate(
                appointment.getAppointmentDate());

        existing.setAppointmentTime(
                appointment.getAppointmentTime());

        existing.setStatus(
                appointment.getStatus());

        // 'reason' field/accessor not present on Appointment; skip if absent

        existing.setPatient(
                appointment.getPatient());

        existing.setDoctor(
                appointment.getDoctor());

        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(@NonNull Long id) {
        appointmentRepository.deleteById(id);
    }
}