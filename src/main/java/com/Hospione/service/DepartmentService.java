package com.Hospione.service;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.Hospione.entity.Department;
import com.Hospione.repository.DepartmentRepository;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> getDepartmentById(@NonNull Long id) {
        return departmentRepository.findById(id);
    }

    public Department createDepartment(@NonNull Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(@NonNull Long id, @NonNull Department department) {

        Department existing = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Department not found"));

        existing.setName(department.getName());
        existing.setDescription(department.getDescription());

        return departmentRepository.save(existing);
    }

    public void deleteDepartment(@NonNull Long id) {
        departmentRepository.deleteById(id);
    }
}