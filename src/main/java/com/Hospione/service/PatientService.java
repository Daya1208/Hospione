package com.Hospione.service;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.Hospione.entity.Patient;
import com.Hospione.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(@NonNull Long id) {
        return patientRepository.findById(id);
    }

    public Patient createPatient(@NonNull Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(@NonNull Long id, Patient patient) {

        Patient existing = patientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found"));

        existing.setName(patient.getName());
        existing.setAge(patient.getAge());
        existing.setGender(patient.getGender());
        existing.setEmail(patient.getEmail());
        existing.setPhone(patient.getPhone());
        existing.setAddress(patient.getAddress());
        existing.setBloodGroup(patient.getBloodGroup());

        return patientRepository.save(existing);
    }

    public void deletePatient(@NonNull Long id) {
        patientRepository.deleteById(id);
    }
}