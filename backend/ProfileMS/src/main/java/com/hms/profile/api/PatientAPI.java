package com.hms.profile.api;

import com.hms.profile.dto.DoctorDropdown;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exceptioin.HmsException;
import com.hms.profile.service.PatientService;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/profile/patient")
@Validated
public class PatientAPI {
    @Autowired
    private PatientService patientService;

    @PostMapping("/add")
    public ResponseEntity<Long> addPatient(@RequestBody PatientDTO patientDTO) throws HmsException {
        return new ResponseEntity<>(patientService.addPatient(patientDTO),HttpStatus.CREATED);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable Long id) throws HmsException {
        return new ResponseEntity<>(patientService.getPatientById(id), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    public ResponseEntity<PatientDTO> updatePatient( @RequestBody PatientDTO patientDTO) throws HmsException{
        return new ResponseEntity<>(patientService.updatePatient(patientDTO), HttpStatus.OK);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> patientExists(@PathVariable Long id) throws HmsException{
        return new ResponseEntity<>(patientService.patientExists(id), HttpStatus.OK);
    }
    @GetMapping("/getPatientsById")
    public ResponseEntity<List<DoctorDropdown>> getDoctorsById(@RequestParam List<Long> ids) throws HmsException{
        return new ResponseEntity<>(patientService.getPatientsById(ids), HttpStatus.OK);
    }
}
