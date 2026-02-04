import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../Service/DoctorProfileService";
import DoctorCard from "./DoctorCard";

const Doctor = () => {
  const [Doctors, setDoctors] = useState<any[]>([]);
  useEffect(() => {
    getAllDoctors()
      .then((res) => {
        console.log(res);
        setDoctors(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="text-xl text-primary-500 font-semibold mb-5">
        All Doctors
      </div>
      <div className="grid grid-cols-4 gap-5">
        {Doctors.map((Doctor) => (
          <DoctorCard key={Doctor.id} {...Doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctor;
