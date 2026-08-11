package com.Hospione.service;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.Hospione.entity.Doctor;
import com.Hospione.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(@NonNull Long id) {
        return doctorRepository.findById(id);
    }

    public Doctor createDoctor(@NonNull Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(@NonNull Long id, Doctor doctor) {

        Doctor existing = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        existing.setName(doctor.getName());
        existing.setEmail(doctor.getEmail());
        existing.setPhone(doctor.getPhone());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setQualification(doctor.getQualification());
        existing.setDepartment(doctor.getDepartment());

        return doctorRepository.save(existing);
    }

    public void deleteDoctor(@NonNull Long id) {
        doctorRepository.deleteById(id);
    }
}