package com.hms.appointment.api;

import com.hms.appointment.dto.*;
import com.hms.appointment.exception.HmsException;
import com.hms.appointment.service.AppointmentService;
import com.hms.appointment.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/appointment")
@Validated
public class AppointmentAPI {
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PrescriptionService prescriptionService;
    @PostMapping("/schedule")
    public ResponseEntity<Long> scheduleAppointment(@RequestBody AppointmentDTO appointmentDTO) throws HmsException {
        System.out.println("----> "+ appointmentDTO.toString());
        return new ResponseEntity<>(appointmentService.scheduleAppointment(appointmentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/cancel/{appointmentId}")
    public ResponseEntity<String> cancelAppointment(@PathVariable long appointmentId) throws HmsException {
        appointmentService.cancelAppointment(appointmentId);
        return new ResponseEntity<>("Appointment Cancelled", HttpStatus.OK);
    }

    @GetMapping("/get/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointmentDetails(@PathVariable Long appointmentId) throws HmsException {
        return new ResponseEntity<>(appointmentService.getAppointmentDetails(appointmentId), HttpStatus.OK);
    }
    
    @GetMapping("/get/details/{appointmentId}")
    public ResponseEntity<AppointmentDetails> getAppointmentDetailsWithName(@PathVariable Long appointmentId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAppointmentDetailsWithName(appointmentId), HttpStatus.OK);
    }

    @GetMapping("/getAllByPatient/{patientId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentByPatientId(@PathVariable Long patientId)throws HmsException{
        return new ResponseEntity<>(appointmentService.getAllAppointmentsByPatientId(patientId),HttpStatus.OK);
    }

    @GetMapping("/getAllByDoctor/{doctorId}")
    public ResponseEntity<List<AppointmentDetails>> getAllAppointmentsByDoctor(@PathVariable Long doctorId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getAllAppointmentsByDoctorId(doctorId), HttpStatus.OK);
    }

    @GetMapping("/countByPatient/{patientId}")
    public ResponseEntity<List<MonthlyVisitDTO>> getAppointmentCountByPatient(@PathVariable Long patientId) throws HmsException{
        return  new ResponseEntity<>(appointmentService.getAppointmentCountByPatient(patientId), HttpStatus.OK);
    }

    @GetMapping("/countByDoctor/{doctorId}")
    public ResponseEntity<List<MonthlyVisitDTO>> getAppointmentCountByDoctor(@PathVariable Long doctorId) throws HmsException{
        return  new ResponseEntity<>(appointmentService.getAppointmentCountByDoctor(doctorId), HttpStatus.OK);
    }


    @GetMapping("/visitCounts")
    public ResponseEntity<List<MonthlyVisitDTO>> getAppointmentCounts(@PathVariable Long patientId) throws HmsException{
        return  new ResponseEntity<>(appointmentService.getAppointmentCounts(), HttpStatus.OK);
    }

    @GetMapping("/countReasonsByPatient/{patientId}")
    public ResponseEntity<List<ReasonCountDTO>>  getReasonCountByPatient(@PathVariable Long patientId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getReasonCountByPatient(patientId), HttpStatus.OK);
    }

    @GetMapping("/countReasonsByDoctor/{doctorId}")
    public ResponseEntity<List<ReasonCountDTO>>  getReasonCountByDoctor(@PathVariable Long doctorId) throws HmsException{
        return new ResponseEntity<>(appointmentService.getReasonCountByDoctor(doctorId), HttpStatus.OK);
    }

    @GetMapping("/countReasons")
    public ResponseEntity<List<ReasonCountDTO>> getReasonCounts() throws HmsException{
        return new ResponseEntity<>(appointmentService.getReasons(), HttpStatus.OK);
    }

    @GetMapping("/getMedicineByPatient/{patientId}")
    public ResponseEntity<List<MedicineDTO>> getMedicineByPatient(@PathVariable Long patientId) throws HmsException{
        return new ResponseEntity<>(prescriptionService.getMedicinesByPatientId(patientId), HttpStatus.OK);
    }

    @GetMapping("/today")
    public ResponseEntity<List<AppointmentDetails>> getTodayAppointments() throws HmsException{
        return new ResponseEntity<>(appointmentService.getTodayAppointments(), HttpStatus.OK);
    }

}
