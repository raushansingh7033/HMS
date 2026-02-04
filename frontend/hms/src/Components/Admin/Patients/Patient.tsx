import { useEffect, useState } from "react";
import { getAllPatients } from "../../../Service/PatientProfileService";
import PatientCard from "./PatientCard";

const Patient = () => {
  const [patients, setPatients] = useState<any[]>([]);
  useEffect(() => {
    getAllPatients()
      .then((res) => {
        console.log(res);
        setPatients(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="text-xl text-primary-500 font-semibold mb-5">
        All Patients
      </div>
      <div className="grid grid-cols-4 gap-5">
        {patients.map((patient) => (
          <PatientCard key={patient.id} {...patient} />
        ))}
      </div>
    </div>
  );
};

export default Patient;
