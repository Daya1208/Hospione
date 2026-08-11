package com.Hospione.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Hospione.entity.Department;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}