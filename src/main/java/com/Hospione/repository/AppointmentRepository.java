package com.Hospione.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Hospione.entity.Appointment;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {
}