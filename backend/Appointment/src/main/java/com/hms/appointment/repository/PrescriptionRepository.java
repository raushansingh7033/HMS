package com.hms.appointment.repository;

import com.hms.appointment.entity.Prescription;
import com.hms.appointment.exception.HmsException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PrescriptionRepository extends CrudRepository<Prescription, Long> {
    // method to find a prescription by appointmentId
    Optional<Prescription> findByAppointment_id(Long appointmentId);

    // method to find all prescriptions by patientId
    List<Prescription> findAllByPatientId(Long patientId);

    @Query("SELECT p.id from Prescription p where p.patientId=?1 ")
    public List<Long> findAllPreIdsByPatient(Long patientId) throws HmsException;

}
