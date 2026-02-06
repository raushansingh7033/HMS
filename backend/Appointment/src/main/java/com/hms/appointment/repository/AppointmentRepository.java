package com.hms.appointment.repository;

import com.hms.appointment.dto.AppointmentDetails;
import com.hms.appointment.dto.MonthlyVisitDTO;
import com.hms.appointment.dto.ReasonCountDTO;
import com.hms.appointment.entity.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends CrudRepository< Appointment, Long> {
    @Query("SELECT new com.hms.appointment.dto.AppointmentDetails(a.id, a.patientId, null, null, null, a.doctorId, null, a.appointmentTime, a.status, " +
            "a.reason, a.notes) FROM Appointment a WHERE a.patientId = ?1")
    List<AppointmentDetails> findAllByPatientId(Long patientId);

    @Query("SELECT new com.hms.appointment.dto.AppointmentDetails(a.id, a.patientId, null, null, null, a.doctorId, null, a.appointmentTime," +
            " a.status, a.reason, a.notes) FROM Appointment a WHERE a.doctorId = ?1")
    List<AppointmentDetails> findAllByDoctortId(Long doctorId);

    @Query("SELECT new com.hms.appointment.dto.MonthlyVisitDTO (CAST(FUNCTION('MONTHNAME',a.appointmentTime)as String ),count(a) ) FROM Appointment a WHERE a.patientId=?1 " +
            "AND YEAR(a.appointmentTime)=YEAR(CURRENT_DATE ) GROUP BY function('MONTH',a.appointmentTime),CAST(FUNCTION('MONTHNAME',a.appointmentTime)as String ) " +
            "order by function('MONTH',a.appointmentTime) ")
    List<MonthlyVisitDTO> countCurrentYearVisitsByPatient(Long patientId);

    @Query("SELECT new com.hms.appointment.dto.MonthlyVisitDTO (CAST(FUNCTION('MONTHNAME',a.appointmentTime)as String ),count(a) ) FROM Appointment a WHERE a.doctorId=?1 " +
            "AND YEAR(a.appointmentTime)=YEAR(CURRENT_DATE ) GROUP BY function('MONTH',a.appointmentTime),CAST(FUNCTION('MONTHNAME',a.appointmentTime)as String ) " +
            "order by function('MONTH',a.appointmentTime) ")
    List<MonthlyVisitDTO> countCurrentYearVisitsByDoctor(Long doctorId);

    @Query("SELECT new com.hms.appointment.dto.MonthlyVisitDTO (CAST(FUNCTION('MONTHNAME',a.appointmentTime)as String ),count(a) ) FROM Appointment a where " +
            " YEAR(a.appointmentTime)=YEAR(CURRENT_DATE ) GROUP BY function('MONTH',a.appointmentTime),CAST(FUNCTION('MONTHNAME',a.appointmentTime)as String ) " +
            "order by function('MONTH',a.appointmentTime) ")
    List<MonthlyVisitDTO> countCurrentYearVisits();


    @Query("SELECT new com.hms.appointment.dto.ReasonCountDTO(a.reason,count(a)) from Appointment a where a.patientId=?1 order by a.reason")
    List<ReasonCountDTO>countReasonsByPatientId(Long patientId);

    @Query("SELECT new com.hms.appointment.dto.ReasonCountDTO(a.reason,count(a)) from Appointment a where a.doctorId=?1 order by a.reason")
    List<ReasonCountDTO>countReasonsByDoctorId(Long doctorId);

    @Query("SELECT new com.hms.appointment.dto.ReasonCountDTO(a.reason,count(a)) from Appointment a  order by a.reason")
    List<ReasonCountDTO>countReasons();

    List<Appointment> findByAppointmentTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
